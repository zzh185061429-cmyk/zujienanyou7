<template>
  <div class="status-bar">
    <span class="status-bar-time">{{ currentTime }}</span>
    <div class="status-bar-icons">
      <!-- 信号图标 -->
      <svg class="status-icon" viewBox="0 0 18 14" fill="none">
        <rect x="0" y="10" width="3" height="4" rx="0.5" fill="currentColor" />
        <rect x="5" y="7" width="3" height="7" rx="0.5" fill="currentColor" />
        <rect x="10" y="4" width="3" height="10" rx="0.5" fill="currentColor" />
        <rect x="15" y="0" width="3" height="14" rx="0.5" fill="currentColor" />
      </svg>
      <!-- 电池图标 -->
      <div class="battery-icon">
        <svg viewBox="0 0 28 14" fill="none">
          <rect x="0" y="0" width="25" height="14" rx="3" stroke="currentColor" stroke-width="1.2" fill="none" />
          <rect x="2" y="2" :width="batteryWidth" height="10" rx="1.5" fill="currentColor" />
          <rect x="25.5" y="3.5" width="2" height="7" rx="1" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
const batteryWidth = ref(18);

let timer: ReturnType<typeof setInterval> | null = null;

function updateTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  currentTime.value = `${h}:${m}`;
}

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 30000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px 4px;
  color: #e0e0e0;
  font-size: 12px;
  flex-shrink: 0;
}

.status-bar-time {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.status-bar-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-icon {
  width: 16px;
  height: 12px;
  color: #e0e0e0;
}

.battery-icon {
  width: 26px;
  height: 12px;
  color: #4ade80;
}
</style>