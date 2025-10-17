import { BaseAgent, AgentTask } from "./base-agent";

export class DevAgent extends BaseAgent {
  async executeTask(task: AgentTask): Promise<string> {
    console.log(`💻 Dev Agent编码: ${task.title}`);

    const prompt = `
## 开发任务

**标题**: ${task.title}
**描述**: ${task.description}

请按照Dev Agent规则实现这个功能，包括：
1. 技术方案设计
2. 代码实现
3. 测试用例
    `;

    const response = await this.callAI(prompt);
    return response;
  }
}
