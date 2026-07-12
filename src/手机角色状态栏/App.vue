<template>
  <div class="phone-container">
    <!-- 手机外壳 -->
    <div class="phone-frame">
      <!-- 刘海 -->
      <div class="phone-notch">
        <div class="notch-speaker" />
        <div class="notch-camera" />
      </div>

      <!-- 屏幕内容区域 -->
      <div class="phone-screen">
        <StatusBar />
        <CharacterPanel
          :character-status="characterStatus"
          @toggle="showPanel = !showPanel"
          :expanded="showPanel"
        />
        <ChatArea :messages="messages" :character-name="characterName" />
        <div class="phone-bottom-bar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import StatusBar from './components/StatusBar.vue';
import ChatArea from './components/ChatArea.vue';
import CharacterPanel from './components/CharacterPanel.vue';

interface CharacterStatus {
  名称: string;
  心情: string;
  体力: number;
  好感度: number;
  位置: string;
  状态: string;
}

const DEFAULT_STATUS: CharacterStatus = {
  名称: '',
  心情: '平静',
  体力: 100,
  好感度: 50,
  位置: '未知',
  状态: '待机中',
};

const characterStatus = ref<CharacterStatus>({ ...DEFAULT_STATUS });
const messages = ref<Array<{ role: string; message: string; name: string }>>([]);
const characterName = ref('');
const showPanel = ref(true);

let pollTimer: ReturnType<typeof setInterval> | null = null;

function loadStatus() {
  try {
    const vars = getVariables({ type: 'chat' });
    if (vars['角色状态']) {
      characterStatus.value = { ...DEFAULT_STATUS, ...vars['角色状态'] };
    }
  } catch {
    // 变量尚未初始化，使用默认值
  }
}

function loadMessages() {
  try {
    const name = getCurrentCharacterName();
    characterName.value = name || '角色';

    // 获取最近 20 条消息
    const count = getLastMessageId?.() ?? 0;
    const start = Math.max(0, count - 20);
    const chatMessages = getChatMessages(`${start}-${count}`);
    messages.value = chatMessages
      .filter(m => !m.is_hidden)
      .slice(-15)
      .map(m => ({
        role: m.role,
        message: m.message,
        name: m.name,
      }));
  } catch {
    // 尚无消息
  }
}

onMounted(() => {
  loadStatus();
  loadMessages();
  // 每秒轮询状态和消息更新
  pollTimer = setInterval(() => {
    loadStatus();
    loadMessages();
  }, 2000);
});

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<style lang="scss" scoped>
.phone-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}

.phone-frame {
  width: 100%;
  max-width: 390px;
  aspect-ratio: 9 / 19;
  background: #1a1a2e;
  border-radius: 36px;
  border: 4px solid #2a2a3e;
  box-shadow:
    0 0 0 2px #0f0f1a,
    0 0 0 6px #1a1a2e,
    0 12px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 28px;
  background: #0f0f1a;
  border-radius: 0 0 20px 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.notch-speaker {
  width: 50px;
  height: 5px;
  background: #1a1a2e;
  border-radius: 3px;
}

.notch-camera {
  width: 10px;
  height: 10px;
  background: #1a1a2e;
  border-radius: 50%;
  border: 1px solid #2a2a3e;
}

.phone-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0f0f23 0%, #16213e 50%, #0f0f23 100%);
  padding-top: 28px;
}

.phone-bottom-bar {
  height: 20px;
  background: transparent;
  flex-shrink: 0;
}
</style>