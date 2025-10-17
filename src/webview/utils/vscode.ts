import type { VSCodeMessage } from "@types/index";

class VSCodeAPI {
  private vscode: any;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  constructor() {
    // 获取 VSCode API
    if (typeof acquireVsCodeApi !== "undefined") {
      this.vscode = acquireVsCodeApi();
    } else {
      console.warn("VSCode API not available, running in browser mode");
      this.vscode = {
        postMessage: (msg: any) => console.log("Mock postMessage:", msg),
        getState: () => ({}),
        setState: (state: any) => console.log("Mock setState:", state),
      };
    }

    // 监听来自插件的消息
    window.addEventListener("message", (event) => {
      const message = event.data as VSCodeMessage;
      this.handleMessage(message);
    });
  }

  /**
   * 发送消息到插件
   */
  postMessage(type: string, data?: any) {
    this.vscode.postMessage({ type, data });
  }

  /**
   * 监听特定类型的消息
   */
  on(type: string, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    // 返回取消监听函数
    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  /**
   * 处理消息
   */
  private handleMessage(message: VSCodeMessage) {
    const callbacks = this.listeners.get(message.type);
    if (callbacks) {
      callbacks.forEach((callback) => callback(message.data));
    }
  }

  /**
   * 保存状态
   */
  setState(state: any) {
    this.vscode.setState(state);
  }

  /**
   * 获取状态
   */
  getState() {
    return this.vscode.getState();
  }
}

// 单例
export const vscode = new VSCodeAPI();

// 便捷方法
export const useVSCode = () => vscode;
