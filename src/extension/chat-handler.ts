import { Coordinator } from "./coordinator";
import { DatabaseManager } from "@core/database";

export class ChatHandler {
  constructor(private coordinator: Coordinator, private db: DatabaseManager) {}

  async handleMessage(userMessage: string): Promise<string> {
    // 保存用户消息
    this.db.createChatMessage("user", userMessage);

    const lowerMessage = userMessage.toLowerCase().trim();
    let response: string;

    // 意图识别和处理
    if (this.isCreateProjectIntent(lowerMessage)) {
      response = await this.handleCreateProject(userMessage);
    } else if (this.isListProjectsIntent(lowerMessage)) {
      response = this.handleListProjects();
    } else if (this.isShowStatsIntent(lowerMessage)) {
      response = this.handleShowStats();
    } else if (this.isConfigIntent(lowerMessage)) {
      response = this.handleConfig();
    } else if (this.isHelpIntent(lowerMessage)) {
      response = this.handleHelp();
    } else if (this.isShowHistoryIntent(lowerMessage)) {
      response = this.handleShowHistory();
    } else {
      // 默认：当作项目需求处理
      response = await this.handleCreateProject(userMessage);
    }

    // 保存助手响应
    this.db.createChatMessage("assistant", response);

    return response;
  }

  // ==================== 意图识别 ====================

  private isCreateProjectIntent(message: string): boolean {
    const keywords = ["创建", "新建", "开发", "做", "实现", "写", "项目"];
    return keywords.some((kw) => message.includes(kw));
  }

  private isListProjectsIntent(message: string): boolean {
    const keywords = ["列表", "所有项目", "查看项目", "项目列表"];
    return keywords.some((kw) => message.includes(kw));
  }

  private isShowStatsIntent(message: string): boolean {
    const keywords = ["统计", "stats", "数据"];
    return keywords.some((kw) => message.includes(kw));
  }

  private isConfigIntent(message: string): boolean {
    const keywords = ["配置", "设置", "config", "agent配置"];
    return keywords.some((kw) => message.includes(kw));
  }

  private isHelpIntent(message: string): boolean {
    const keywords = ["帮助", "help", "怎么用", "如何"];
    return keywords.some((kw) => message.includes(kw));
  }

  private isShowHistoryIntent(message: string): boolean {
    const keywords = ["历史", "记录", "history", "聊天记录"];
    return keywords.some((kw) => message.includes(kw));
  }

  // ==================== 处理器 ====================

  private async handleCreateProject(userInput: string): Promise<string> {
    try {
      const result = await this.coordinator.startProject(userInput);

      // 将项目ID与聊天记录关联
      const recentMessages = this.db.getRecentChatMessages(2);
      recentMessages.forEach((msg) => {
        this.db.db
          .prepare(
            `
          UPDATE chat_messages SET project_id = ? WHERE id = ?
        `
          )
          .run(result.project.id, msg.id);
      });

      return `
✅ **项目创建成功！**

**项目名称**：${result.project.name}  
**项目ID**：\`${result.project.id}\`

**已生成 ${result.tasks.length} 个任务：**

${result.tasks.map((task, i) => `${i + 1}. ${task.title}`).join("\n")}

你可以：
- 查看任务详情
- 开始执行任务
- 查看项目进度
      `.trim();
    } catch (error: any) {
      return `❌ 创建项目失败：${error.message}`;
    }
  }

  private handleListProjects(): string {
    const projects = this.coordinator.getProjects();

    if (projects.length === 0) {
      return '📁 暂无项目。\n\n你可以说"创建一个待办事项应用"来开始！';
    }

    const projectList = projects
      .map((p, i) => {
        const statusEmoji = {
          active: "🟢",
          paused: "🟡",
          completed: "✅",
        }[p.status];

        return `${i + 1}. ${statusEmoji} **${p.name}**\n   ${
          p.description
        }\n   创建时间：${new Date(p.created_at).toLocaleString("zh-CN")}`;
      })
      .join("\n\n");

    return `📁 **项目列表** (共 ${projects.length} 个)\n\n${projectList}`;
  }

  private handleShowStats(): string {
    const stats = this.coordinator.getStats();
    const agents = this.coordinator.getAgents();
    const aiFeedbackStats = this.db.getAIFeedbackStats();

    return `
📊 **系统统计**

**项目数据**：
- 项目：${stats.projects} 个
- 任务：${stats.tasks} 个
- Agent：${stats.agents} 个
- 规则：${stats.rules} 个

**交互数据**：
- 聊天消息：${stats.chatMessages} 条
- AI调用次数：${aiFeedbackStats.totalCount} 次
- 总Token使用：${aiFeedbackStats.totalTokens.toLocaleString()}
- 平均响应时间：${Math.round(aiFeedbackStats.avgDuration)}ms
- 代码修改：${stats.codeModifications} 次

**Agent 状态**：
${agents
  .map((a) => {
    const statusIcon =
      a.status === "idle" ? "🟢" : a.status === "busy" ? "🔵" : "⚫";
    return `- ${a.name}：${a.status} ${statusIcon}`;
  })
  .join("\n")}
    `.trim();
  }

  private handleConfig(): string {
    return `
⚙️ **配置选项**

你可以：
1. 配置 API Key（Settings > Multi-Agent Coder）
2. 编辑 Agent 规则（通过配置面板）
3. 调整 Agent 角色分配

输入"打开配置面板"来进行详细配置。
    `.trim();
  }

  private handleHelp(): string {
    return `
💡 **使用帮助**

**创建项目**：
- "创建一个用户认证系统"
- "开发一个博客网站"
- "实现一个待办事项应用"

**查看信息**：
- "显示所有项目"
- "查看统计信息"
- "Agent 配置"
- "显示聊天历史"

**执行任务**：
- "执行第一个任务"
- "开始开发"

**提示**：直接描述你的需求，我会自动识别意图！
    `.trim();
  }

  private handleShowHistory(): string {
    const recentMessages = this.db.getRecentChatMessages(10);

    if (recentMessages.length === 0) {
      return "📝 暂无聊天历史";
    }

    const history = recentMessages
      .reverse()
      .map((msg) => {
        const roleIcon = msg.role === "user" ? "👤" : "🤖";
        const time = new Date(msg.timestamp).toLocaleString("zh-CN");
        return `${roleIcon} **${msg.role}** (${time})\n${msg.content.substring(
          0,
          100
        )}${msg.content.length > 100 ? "..." : ""}`;
      })
      .join("\n\n---\n\n");

    return `📝 **最近的聊天记录**\n\n${history}`;
  }
}
