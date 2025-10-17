import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { Coordinator } from "./coordinator";
import { ChatHandler } from "./chat-handler";
import { DatabaseManager } from "@core/database";

export class WebviewManager {
  private panel?: vscode.WebviewPanel;
  private chatHandler: ChatHandler;

  constructor(
    private context: vscode.ExtensionContext,
    private coordinator: Coordinator,
    private db: DatabaseManager // 新增：传入数据库实例
  ) {
    this.chatHandler = new ChatHandler(coordinator, db);
  }
  showDashboard() {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      "multiAgentDashboard",
      "Multi-Agent 控制面板",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(this.context.extensionPath, "dist/webview")
          ),
        ],
      }
    );

    this.panel.webview.html = this.getWebviewContent();

    // 处理来自WebView的消息
    this.panel.webview.onDidReceiveMessage(async (message) => {
      await this.handleMessage(message);
    });

    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });
  }

  private async handleMessage(message: any) {
    try {
      switch (message.type) {
        case "chatMessage":
          // 处理聊天消息
          const response = await this.chatHandler.handleMessage(
            message.data.text
          );
          this.sendMessage({
            type: "chatResponse",
            data: { text: response },
          });
          break;

        case "getProjects":
          this.sendMessage({
            type: "projectsData",
            data: this.coordinator.getProjects(),
          });
          break;

        case "getAgents":
          this.sendMessage({
            type: "agentsData",
            data: this.coordinator.getAgents(),
          });
          break;

        case "getProjectTasks":
          this.sendMessage({
            type: "tasksData",
            data: this.coordinator.getProjectTasks(message.data),
          });
          break;

        case "executeTask":
          const result = await this.coordinator.executeTask(message.data);
          this.sendMessage({
            type: "taskCompleted",
            data: { taskId: message.data, result },
          });
          break;
      }
    } catch (error: any) {
      this.sendMessage({
        type: "error",
        data: { message: error.message },
      });
    }
  }

  private sendMessage(message: any) {
    this.panel?.webview.postMessage(message);
  }

  private getWebviewContent(): string {
    const distPath = path.join(this.context.extensionPath, "dist/webview");
    const htmlPath = path.join(distPath, "index.html");

    if (!fs.existsSync(htmlPath)) {
      return "<h1>Error: Webview not built. Run `pnpm run build:webview`</h1>";
    }

    let html = fs.readFileSync(htmlPath, "utf-8");

    // 替换资源路径
    html = html.replace(/(src|href)="\/([^"]+)"/g, (match, attr, file) => {
      const fileUri = this.panel!.webview.asWebviewUri(
        vscode.Uri.file(path.join(distPath, file))
      );
      return `${attr}="${fileUri}"`;
    });

    return html;
  }
}
