<template>
  <div class="chat-area" ref="chatRef">
    <div v-if="messages.length === 0" class="chat-empty">
      <i class="fa-regular fa-comments" />
      <p>等待对话开始...</p>
    </div>
    <div
      v-for="(msg, idx) in messages"
      :key="idx"
      class="chat-bubble-row"
      :class="msg.role === 'user' ? 'user-row' : 'char-row'"
    >
      <div class="chat-bubble" :class="msg.role === 'user' ? 'user-bubble' : 'char-bubble'">
        <!-- 角色名 -->
        <div v-if="msg.role !== 'user'" class="bubble-name">{{ msg.name || characterName }}</div>
        <!-- 消息文本 -->
        <div class="bubble-text">{{ truncateMessage(msg.message) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

interface ChatMsg {
  role: string;
  message: string;
  name: string;
}

const props = defineProps<{
  messages: ChatMsg[];
  characterName: string;
}>();

const chatRef = ref<HTMLElement | null>(null);

function truncateMessage(text: string): string {
  // 去除 markdown 格式标记，保留纯文本预览
  const cleaned = text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/#{1,6}\s/g, '')
    .trim();
  return cleaned.length > 80 ? cleaned.slice(0, 80) + '...' : cleaned;
}

// 新消息时自动滚动到底部
watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    if (chatRef.value) {
      chatRef.value.scrollTop = chatRef.value.scrollHeight;
    }
  },
);
</script>

<style lang="scss" scoped>
.chat-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
}

.chat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #475569;
  gap: 8px;

  i {
    font-size: 32px;
  }

  p {
    font-size: 13px;
  }
}

.chat-bubble-row {
  display: flex;
  max-width: 100%;
}

.user-row {
  justify-content: flex-end;
}

.char-row {
  justify-content: flex-start;
}

.chat-bubble {
  max-width: 82%;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 12px;
  line-height: 1.5;
}

.user-bubble {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #e2e8f0;
  border-bottom-right-radius: 4px;
}

.char-bubble {
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  border-bottom-left-radius: 4px;
}

.bubble-name {
  font-size: 10px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 3px;
}

.bubble-text {
  word-break: break-word;
}
</style>