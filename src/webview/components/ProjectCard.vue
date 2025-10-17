<template>
  <div class="project-card card" @click="$emit('click')">
    <div class="project-header">
      <h3>{{ project.name }}</h3>
      <span class="status-badge" :class="project.status">
        {{ project.status }}
      </span>
    </div>
    <p class="description">{{ project.description }}</p>
    <div class="project-meta">
      <span>📅 {{ formatDate(project.created_at) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
  };
}>();

defineEmits<{
  click: [];
}>();

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN");
}
</script>

<style scoped>
.project-card {
  cursor: pointer;
  transition: all 0.2s;
}

.project-card:hover {
  border-color: var(--vscode-focusBorder);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.project-header h3 {
  font-size: 16px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
}

.description {
  font-size: 14px;
  color: var(--vscode-descriptionForeground);
  margin-bottom: 12px;
  line-height: 1.5;
}

.project-meta {
  font-size: 12px;
  color: var(--vscode-descriptionForeground);
}
</style>
