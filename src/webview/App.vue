<template>
  <div class="app">
    <!-- 聊天对话框 -->
    <ChatDialog ref="chatDialogRef" />

    <!-- 其他内容... -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ChatDialog from "@components/ChatDialog.vue";

const chatDialogRef = ref();

onMounted(() => {
  // 自动显示聊天
  chatDialogRef.value?.show();
});
</script>
