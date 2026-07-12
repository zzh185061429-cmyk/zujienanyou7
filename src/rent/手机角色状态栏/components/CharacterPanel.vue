<template>
  <div class="character-panel" :class="{ expanded: expanded }">
    <!-- 折叠状态：摘要条 -->
    <div class="panel-header" @click="$emit('toggle')">
      <div class="panel-avatar">
        <i class="fa-solid fa-user" />
      </div>
      <div class="panel-summary">
        <span class="panel-name">{{ characterStatus.名称 || '角色' }}</span>
        <span class="panel-mood">{{ characterStatus.心情 }}</span>
      </div>
      <div class="panel-toggle">
        <i :class="expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" />
      </div>
    </div>

    <!-- 展开状态：详细属性 -->
    <div v-if="expanded" class="panel-detail">
      <!-- 体力条 -->
      <div class="stat-row">
        <span class="stat-label">
          <i class="fa-solid fa-heart" />
          体力
        </span>
        <div class="stat-bar">
          <div
            class="stat-bar-fill stamina"
            :style="{ width: characterStatus.体力 + '%' }"
          />
        </div>
        <span class="stat-value">{{ characterStatus.体力 }}</span>
      </div>

      <!-- 好感度条 -->
      <div class="stat-row">
        <span class="stat-label">
          <i class="fa-solid fa-star" />
          好感度
        </span>
        <div class="stat-bar">
          <div
            class="stat-bar-fill affection"
            :style="{ width: characterStatus.好感度 + '%' }"
          />
        </div>
        <span class="stat-value">{{ characterStatus.好感度 }}</span>
      </div>

      <!-- 位置 -->
      <div class="stat-row info-row">
        <span class="stat-label">
          <i class="fa-solid fa-location-dot" />
          位置
        </span>
        <span class="stat-text">{{ characterStatus.位置 }}</span>
      </div>

      <!-- 状态 -->
      <div class="stat-row info-row">
        <span class="stat-label">
          <i class="fa-solid fa-circle-info" />
          状态
        </span>
        <span class="stat-text">{{ characterStatus.状态 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CharacterStatus {
  名称: string;
  心情: string;
  体力: number;
  好感度: number;
  位置: string;
  状态: string;
}

defineProps<{
  characterStatus: CharacterStatus;
  expanded: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<style lang="scss" scoped>
.character-panel {
  margin: 8px 12px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  gap: 10px;
  user-select: none;

  &:active {
    background: rgba(255, 255, 255, 0.04);
  }
}

.panel-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  flex-shrink: 0;
}

.panel-summary {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.panel-name {
  font-size: 13px;
  font-weight: 600;
  color: #e8e8e8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel-mood {
  font-size: 11px;
  color: #94a3b8;
}

.panel-toggle {
  color: #64748b;
  font-size: 12px;
}

.panel-detail {
  padding: 0 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-label {
  width: 52px;
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  i {
    font-size: 10px;
  }
}

.stat-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;

  &.stamina {
    background: linear-gradient(90deg, #ef4444, #f97316, #22c55e);
  }

  &.affection {
    background: linear-gradient(90deg, #ec4899, #f43f5e);
  }
}

.stat-value {
  width: 24px;
  font-size: 11px;
  color: #cbd5e1;
  text-align: right;
  flex-shrink: 0;
}

.info-row {
  .stat-text {
    font-size: 11px;
    color: #cbd5e1;
  }
}
</style>