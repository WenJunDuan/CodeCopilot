<template>
  <div class="task-list">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task-item card"
      :class="`status-${task.status}`"
    >
      <div class="task-header">
        <span class="task-icon">{{ getStatusIcon(task.status) }}</span>
        <h4>{{ task.title }}</h4>
      </div>
      <p v-if="task.description" class="task-desc">{{ task.description }}</p>
      <div class="task-footer">
        <span class="task-status">{{ task.status }}</span>
        <button
          v-if="task.status === 'pending'"
          class="btn btn-sm"
          @click="$emit('execute', task.id)"
        >
          执行
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tasks: any[];
}>();

defineEmits<{
  execute: [taskId: string];
}>();

function getStatusIcon(status: string) {
  const icons: Record<string, string> = {
    pending: "⏳",
    running: "🔄",
    completed: "✅",
    failed: "❌",
  };
  return icons[status] || "📌";
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  transition: all 0.2s;
}

.task-item.status-running {
  border-left: 4px solid #ffa500;
}

.task-item.status-completed {
  border-left: 4px solid #4caf50;
  opacity: 0.7;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.task-icon {
  font-size: 20px;
}

.task-header h4 {
  font-size: 14px;
  font-weight: 500;
}

.task-desc {
  font-size: 13px;
  color: var(--vscode-descriptionForeground);
  margin-bottom: 12px;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-status {
  font-size: 12px;
  color: var(--vscode-descriptionForeground);
}

.btn-sm {
  padding: 4px 12px;
  font-size: 12px;
}
</style>
