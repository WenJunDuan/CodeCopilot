import { DatabaseManager, AgentRule, AIFeedback } from "@core/database";

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  apiKey?: string;
  db: DatabaseManager;
}

export interface AgentTask {
  id: string;
  title: string;
  description: string;
}

export abstract class BaseAgent {
  protected rule: string;

  constructor(protected config: AgentConfig) {
    this.loadRule();
    console.log(`✅ ${config.name} 创建成功`);
  }

  private loadRule() {
    const agentRule = this.config.db.getAgentRule(this.config.role);

    if (agentRule) {
      this.rule = agentRule.rule_content;
      console.log(
        `📋 ${this.config.name} 已加载规则 (版本 ${agentRule.version})`
      );
    } else {
      this.rule = "# 默认规则\n\n暂无规则配置";
      console.warn(`⚠️ ${this.config.name} 未找到规则，使用默认规则`);
    }
  }

  reloadRule() {
    this.loadRule();
  }

  getRule(): string {
    return this.rule;
  }

  abstract executeTask(task: AgentTask): Promise<string>;

  /**
   * 调用AI，自动记录反馈
   */
  protected async callAI(
    prompt: string,
    options?: {
      projectId?: string;
      taskId?: string;
      model?: string;
    }
  ): Promise<string> {
    const fullPrompt = `
${this.rule}

---

# 当前任务

${prompt}

请严格按照上述规则完成任务。
    `.trim();

    const startTime = Date.now();

    try {
      let response: string;
      let tokensUsed: number | undefined;
      const model = options?.model || "claude-sonnet-4-20250514";

      if (!this.config.apiKey) {
        console.log("⚠️ 未配置API Key，使用模拟响应");
        response = this.getMockResponse();
        tokensUsed = undefined;
      } else {
        // 实际调用Claude API
        const apiResponse = await fetch(
          "https://api.anthropic.com/v1/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": this.config.apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model,
              max_tokens: 4096,
              messages: [
                {
                  role: "user",
                  content: fullPrompt,
                },
              ],
            }),
          }
        );

        if (!apiResponse.ok) {
          throw new Error(`API调用失败: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        response = data.content[0].text;
        tokensUsed = data.usage?.input_tokens + data.usage?.output_tokens;
      }

      const durationMs = Date.now() - startTime;

      // 保存AI反馈记录
      this.config.db.createAIFeedback({
        agentId: this.config.id,
        prompt: fullPrompt,
        response,
        model,
        projectId: options?.projectId,
        taskId: options?.taskId,
        tokensUsed,
        durationMs,
        metadata: {
          ruleVersion: this.config.db.getAgentRule(this.config.role)?.version,
        },
      });

      console.log(
        `✅ AI调用成功 (耗时: ${durationMs}ms, tokens: ${tokensUsed || "N/A"})`
      );

      return response;
    } catch (error: any) {
      console.error("❌ AI调用失败:", error.message);

      // 记录失败的调用
      this.config.db.createAIFeedback({
        agentId: this.config.id,
        prompt: fullPrompt,
        response: `ERROR: ${error.message}`,
        model: options?.model || "unknown",
        projectId: options?.projectId,
        taskId: options?.taskId,
        durationMs: Date.now() - startTime,
        metadata: { error: error.message },
      });

      return this.getMockResponse();
    }
  }

  /**
   * 记录代码修改
   */
  protected recordCodeModification(data: {
    projectId: string;
    filePath: string;
    modificationType: "create" | "update" | "delete" | "rename";
    taskId?: string;
    beforeContent?: string;
    afterContent?: string;
    diff?: string;
    reason?: string;
    aiFeedbackId?: string;
  }): void {
    this.config.db.createCodeModification({
      ...data,
      agentId: this.config.id,
      canRollback: true,
    });

    console.log(
      `📝 已记录代码修改: ${data.filePath} (${data.modificationType})`
    );
  }

  private getMockResponse(): string {
    return `这是 ${
      this.config.name
    } 的模拟响应\n\n根据规则:\n${this.rule.substring(
      0,
      200
    )}...\n\n任务已完成！`;
  }

  getInfo() {
    return {
      id: this.config.id,
      name: this.config.name,
      role: this.config.role,
      ruleVersion: this.config.db.getAgentRule(this.config.role)?.version || 0,
    };
  }
}
