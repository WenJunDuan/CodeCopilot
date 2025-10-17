import * as vscode from "vscode";
import { Coordinator } from "./coordinator";
import { WebviewManager } from "./webview-manager";

let coordinator: Coordinator;
let webviewManager: WebviewManager;

export function activate(context: vscode.ExtensionContext) {
  console.log("🎉 Multi-Agent Coder 已激活！");

  // 初始化
  const storagePath = context.globalStorageUri.fsPath;
  coordinator = new Coordinator(storagePath);
  webviewManager = new WebviewManager(context, coordinator);

  // 注册命令：开始编程
  const startCmd = vscode.commands.registerCommand(
    "multiAgentCoder.start",
    async () => {
      const input = await vscode.window.showInputBox({
        prompt: "请描述你想开发的功能",
        placeHolder: "例如：开发一个待办事项列表",
      });

      if (!input) return;

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Multi-Agent 正在工作...",
          cancellable: false,
        },
        async () => {
          const result = await coordinator.startProject(input);
          vscode.window.showInformationMessage(
            `✅ 项目已创建！生成了 ${result.tasks.length} 个任务`
          );

          // 打开控制面板
          webviewManager.showDashboard();
        }
      );
    }
  );

  // 注册命令：打开控制面板
  const dashboardCmd = vscode.commands.registerCommand(
    "multiAgentCoder.showDashboard",
    () => {
      webviewManager.showDashboard();
    }
  );

  context.subscriptions.push(startCmd, dashboardCmd);
}

export function deactivate() {
  coordinator?.dispose();
}
