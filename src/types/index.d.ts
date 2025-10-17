/// <reference types="vscode" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 全局类型定义
declare global {
  interface Window {
    acquireVsCodeApi?: () => VSCodeApi;
  }

  interface VSCodeApi {
    postMessage(message: any): void;
    getState(): any;
    setState(state: any): void;
  }
}

// VSCode 消息类型
export interface VSCodeMessage {
  type: string;
  data?: any;
}

// 项目相关类型
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  agent_id?: string;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "idle" | "busy" | "offline";
  last_heartbeat?: string;
}

export interface AgentRule {
  id: string;
  agent_role: string;
  rule_content: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export {};
