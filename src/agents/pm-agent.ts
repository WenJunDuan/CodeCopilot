import { BaseAgent, AgentTask } from "./base-agent";

export class PMAgent extends BaseAgent {
  async executeTask(task: AgentTask): Promise<string> {
    console.log(`📋 PM Agent处理任务: ${task.title}`);

    const prompt = `
## 任务信息

**标题**: ${task.title}
**描述**: ${task.description}

请按照PM Agent规则分析这个需求，并拆解为具体任务。
    `;

    const response = await this.callAI(prompt);
    return response;
  }

  async analyzeRequirement(requirement: string): Promise<string[]> {
    const prompt = `
## 用户需求

${requirement}

请分析需求并拆解为任务列表，每个任务一行。
    `;

    const response = await this.callAI(prompt);

    // 解析任务列表
    return response
      .split("\n")
      .filter((line) => {
        const trimmed = line.trim();
        // 匹配 "1. xxx" 或 "[P0] xxx" 格式
        return /^(\d+\.|[\[\(][Pp][0-2][\]\)])/.test(trimmed);
      })
      .map((line) => {
        // 移除序号和优先级标记
        return line.replace(/^(\d+\.|[\[\(][Pp][0-2][\]\)])\s*/, "").trim();
      })
      .filter((task) => task.length > 0);
  }
}
