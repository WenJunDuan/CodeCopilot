<template>
  <div class="chat-dialog" v-show="visible">
    <div class="chat-overlay" @click="close"></div>

    <div class="chat-container">
      <div class="chat-header">
        <h2>💬 Multi-Agent 助手</h2>
        <button class="close-btn" @click="close">✕</button>
      </div>

      <div class="chat-messages" ref="messagesRef">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message', msg.role]"
        >
          <div class="message-avatar">
            {{ msg.role === "user" ? "👤" : "🤖" }}
          </div>
          <div class="message-content">
            <div class="message-text" v-html="formatMessage(msg.text)"></div>
            <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
          </div>
        </div>

        <div v-if="isLoading" class="message assistant">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input-area">
        <div class="quick-actions">
          <button
            v-for="action in quickActions"
            :key="action.text"
            class="quick-action-btn"
            @click="handleQuickAction(action.command)"
          >
            {{ action.text }}
          </button>
        </div>

        <div class="chat-input-wrapper">
          <textarea
            ref="inputRef"
            v-model="inputText"
            placeholder="输入指令或问题，例如：创建一个待办事项应用"
            class="chat-input"
            rows="1"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.ctrl.enter="inputText += '\n'"
            @input="autoResize"
          ></textarea>

          <button
            class="send-btn"
            :disabled="!inputText.trim() || isLoading"
            @click="sendMessage"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { useVSCode } from "@utils/vscode";
import { marked } from "marked";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface QuickAction {
  text: string;
  command: string;
}

const vscode = useVSCode();

const visible = ref(true);
const messages = ref<Message[]>([
  {
    id: "1",
    role: "assistant",
    text: "你好！我是 Multi-Agent 编程助手。\n\n你可以：\n- 创建新项目：描述你的需求\n- 查看项目列表\n- 执行任务\n- 配置 Agent\n\n请问有什么可以帮你？",
    timestamp: new Date(),
  },
]);

const inputText = ref("");
const isLoading = ref(false);
const messagesRef = ref<HTMLElement>();
const inputRef = ref<HTMLTextAreaElement>();

const quickActions: QuickAction[] = [
  { text: "📁 创建项目", command: "create-project" },
  { text: "📋 查看项目", command: "list-projects" },
  { text: "⚙️ 配置 Agent", command: "config-agents" },
  { text: "📊 查看统计", command: "show-stats" },
];

// 监听来自插件的响应
vscode.on("chatResponse", (data) => {
  addMessage("assistant", data.text);
  isLoading.value = false;
});

vscode.on("error", (data) => {
  addMessage("assistant", `❌ 错误：${data.message}`);
  isLoading.value = false;
});

function addMessage(role: "user" | "assistant", text: string) {
  messages.value.push({
    id: Date.now().toString(),
    role,
    text,
    timestamp: new Date(),
  });

  nextTick(() => {
    scrollToBottom();
  });
}

function sendMessage() {
  const text = inputText.value.trim();
  if (!text || isLoading.value) return;

  // 添加用户消息
  addMessage("user", text);

  // 清空输入
  inputText.value = "";
  resetTextarea();

  // 显示加载状态
  isLoading.value = true;

  // 发送到插件处理
  vscode.postMessage("chatMessage", { text });
}

function handleQuickAction(command: string) {
  const commandTexts: Record<string, string> = {
    "create-project": "我想创建一个新项目",
    "list-projects": "显示所有项目列表",
    "config-agents": "打开 Agent 配置",
    "show-stats": "显示项目统计信息",
  };

  inputText.value = commandTexts[command] || command;
  sendMessage();
}

function formatMessage(text: string): string {
  // 使用 marked 渲染 Markdown
  return marked(text);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scrollToBottom() {
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  }
}

function autoResize() {
  const textarea = inputRef.value;
  if (!textarea) return;

  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
}

function resetTextarea() {
  if (inputRef.value) {
    inputRef.value.style.height = "auto";
  }
}

function close() {
  visible.value = false;
}

// 暴露方法给父组件
defineExpose({
  show: () => (visible.value = true),
  hide: () => (visible.value = false),
});
</script>

<style scoped>
.chat-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.chat-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.chat-container {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 500px;
  height: 700px;
  max-height: calc(100vh - 40px);
  background: var(--vscode-editor-background);
  border: 1px solid var(--vscode-panel-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vscode-panel-border);
  background: var(--vscode-sideBar-background);
}

.chat-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--vscode-foreground);
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: var(--vscode-toolbar-hoverBackground);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  background: var(--vscode-button-background);
}

.message-content {
  flex: 1;
  max-width: 70%;
}

.message.user .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-text {
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--vscode-input-background);
  border: 1px solid var(--vscode-input-border);
  word-wrap: break-word;
  line-height: 1.6;
}

.message.user .message-text {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
}

.message-text :deep(pre) {
  background: var(--vscode-textCodeBlock-background);
  padding: 8px;
  border-radius: 4px;
  overflow-x: auto;
}

.message-text :deep(code) {
  background: var(--vscode-textCodeBlock-background);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: var(--vscode-editor-font-family);
}

.message-time {
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  margin-top: 4px;
  padding: 0 4px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vscode-foreground);
  opacity: 0.3;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  30% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.chat-input-area {
  border-top: 1px solid var(--vscode-panel-border);
  padding: 16px;
  background: var(--vscode-sideBar-background);
}

.quick-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.quick-action-btn {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid var(--vscode-button-border);
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-action-btn:hover {
  background: var(--vscode-button-secondaryHoverBackground);
  transform: translateY(-1px);
}

.chat-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--vscode-input-border);
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border-radius: 8px;
  resize: none;
  font-family: var(--vscode-font-family);
  font-size: 14px;
  line-height: 1.5;
  min-height: 40px;
  max-height: 200px;
}

.chat-input:focus {
  outline: none;
  border-color: var(--vscode-focusBorder);
}

.send-btn {
  padding: 10px 20px;
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 60px;
  height: 40px;
}

.send-btn:hover:not(:disabled) {
  background: var(--vscode-button-hoverBackground);
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
