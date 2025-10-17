<template>
  <div class="agent-card" :class="`status-${agent.status}`">
    <div class="agent-icon">{{ getIcon(agent.role) }}</div>
    <div class="agent-info">
      <h3>{{ agent.name }}</h3>
      <p class="role">{{ agent.role }}</p>
      <span class="status">{{ getStatusText(agent.status) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  agent: {
    id: string;
    name: string;
    role: string;
    status: string;
  };
}>();

function getIcon(role: string) {
  const icons: Record<string, string> = {
    pm: "📋",
    dev: "💻",
    qa: "🧪",
    review: "👀",
    doc: "📚",
  };
  return icons[role] || "🤖";
}

function getStatusText(status: string) {
  const texts: Record<string, string> = {
    idle: "空闲",
    busy: "工作中",
    offline: "离线",
  };
  return texts[status] || status;
}
</script>

<style scoped>
.agent-card {
  background: var(--vscode-editor-background);
  border: 2px solid var(--vscode-panel-border);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
}

.agent-card:hover {
  border-color: var(--vscode-focusBorder);
  transform: translateY(-2px);
}

.agent-card.status-busy {
  border-color: #ffa500;
}

.agent-icon {
  font-size: 32px;
}

.agent-info h3 {
  font-size: 14px;
  margin-bottom: 4px;
}

.role {
  font-size: 12px;
  color: var(--vscode-descriptionForeground);
  margin-bottom: 8px;
}

.status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
}
</style>
