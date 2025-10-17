import { DatabaseManager, Project, Task } from "../core/database";
import { PMAgent } from "../agents/pm-agent";
import { DevAgent } from "../agents/dev-agent";
import { BaseAgent } from "../agents/base-agent";

export interface ProjectStartResult {
  project: Project;
  tasks: Task[];
}

export class Coordinator {
  private db: DatabaseManager;
  private agents: Map<string, BaseAgent> = new Map();

  constructor(storagePath: string, apiKey?: string) {
    this.db = new DatabaseManager(storagePath);
    this.initializeAgents(apiKey);
  }

  private initializeAgents(apiKey?: string) {
    // 创建PM Agent
    const pmAgent = new PMAgent({
      id: "pm-001",
      name: "PM助手",
      role: "pm",
      apiKey,
      db: this.db, // 传递数据库引用
    });

    // 创建Dev Agent
    const devAgent = new DevAgent({
      id: "dev-001",
      name: "开发助手",
      role: "dev",
      apiKey,
      db: this.db, // 传递数据库引用
    });

    this.agents.set("pm", pmAgent);
    this.agents.set("dev", devAgent);

    // 注册到数据库
    this.db.registerAgent("pm-001", "PM助手", "pm");
    this.db.registerAgent("dev-001", "开发助手", "dev");

    console.log("✅ Agents初始化完成");
  }

  async startProject(userInput: string): Promise<ProjectStartResult> {
    console.log("🚀 开始新项目:", userInput);

    // 1. 创建项目
    const project = this.db.createProject("新项目", userInput);

    // 2. PM分析需求
    const pmAgent = this.agents.get("pm") as PMAgent;
    this.db.updateAgentStatus("pm-001", "busy");

    const taskTitles = await pmAgent.analyzeRequirement(userInput);

    this.db.updateAgentStatus("pm-001", "idle");

    // 3. 创建任务
    const tasks: Task[] = [];
    for (const title of taskTitles) {
      if (title) {
        const task = this.db.createTask(project.id, title, "");
        tasks.push(task);
      }
    }

    console.log(`✅ 项目创建完成，生成 ${tasks.length} 个任务`);

    return { project, tasks };
  }

  async executeTask(taskId: string): Promise<string> {
    const task = this.db.getTask(taskId);
    if (!task) {
      throw new Error("任务不存在");
    }

    // 更新状态
    this.db.updateTaskStatus(taskId, "running", "dev-001");
    this.db.updateAgentStatus("dev-001", "busy");

    try {
      // 执行任务
      const devAgent = this.agents.get("dev") as DevAgent;
      const result = await devAgent.executeTask({
        id: task.id,
        title: task.title,
        description: task.description,
      });

      // 完成
      this.db.updateTaskStatus(taskId, "completed", "dev-001");
      this.db.updateAgentStatus("dev-001", "idle");

      return result;
    } catch (error: any) {
      this.db.updateTaskStatus(taskId, "failed", "dev-001");
      this.db.updateAgentStatus("dev-001", "idle");
      throw error;
    }
  }

  getProjects(): Project[] {
    return this.db.getAllProjects();
  }

  getProjectTasks(projectId: string): Task[] {
    return this.db.getProjectTasks(projectId);
  }

  getAgents() {
    return this.db.getAllAgents();
  }

  /**
   * 获取所有Agent规则（用于UI展示/编辑）
   */
  getAgentRules() {
    return this.db.getAllAgentRules();
  }

  /**
   * 更新Agent规则
   */
  updateAgentRule(role: string, content: string) {
    this.db.updateAgentRule(role, content);

    // 重新加载Agent的规则
    const agent = this.agents.get(role);
    if (agent) {
      agent.reloadRule();
      console.log(`✅ ${role} Agent规则已更新`);
    }
  }

  dispose() {
    this.db.close();
  }
}
