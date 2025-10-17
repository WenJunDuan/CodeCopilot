<template>
  <div class="rule-editor">
    <h3>编辑 {{ role }} Agent 规则</h3>
    <textarea v-model="ruleContent" rows="20"></textarea>
    <button @click="save">保存</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ role: string; initialContent: string }>();
const ruleContent = ref(props.initialContent);

function save() {
  // 发送消息给插件
  vscode.postMessage({
    type: "updateAgentRule",
    data: { role: props.role, content: ruleContent.value },
  });
}
</script>
