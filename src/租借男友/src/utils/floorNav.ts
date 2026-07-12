/**
 * 楼层导航工具
 *
 * 核心机制：exit 当前全屏 → 滚动父窗口到目标楼层 → 目标楼层 iframe 进入全屏
 * 因所有楼层加载同一 URL 且同源 (localhost)，可直接操纵兄弟 iframe 的 contentDocument
 */

/** 扫描所有 assistant 楼层（供下拉列表使用） */
export function getAssistantFloors(): number[] {
  try {
    const messages = getChatMessages('0-{{lastMessageId}}', { role: 'assistant' });
    return messages.map((m) => m.message_id).sort((a, b) => a - b);
  } catch {
    return [];
  }
}

/** 获取当前楼层 ID */
export function getCurrentFloorId(): number | null {
  try {
    return getCurrentMessageId();
  } catch {
    return null;
  }
}

/**
 * 在父窗口 DOM 中寻找指定楼层的 iframe
 *
 * SillyTavern 在不同版本/主题下消息容器的属性名不同，
 * 使用多重 fallback 选择器覆盖常见情况。
 */
function findFloorIframe(floorId: number): HTMLIFrameElement | null {
  const doc = window.parent.document;

  const selectors = [
    `[mesid="${floorId}"] iframe`,
    `[data-message-id="${floorId}"] iframe`,
    `.mes[mesid="${floorId}"] iframe`,
    `.chatlog [data-id="${floorId}"] iframe`,
    `.chatlog [mesid="${floorId}"] iframe`,
  ];

  for (const sel of selectors) {
    try {
      const el = doc.querySelector(sel);
      if (el instanceof HTMLIFrameElement) return el;
    } catch {
      /* 选择器可能无效 */
    }
  }

  // 兜底：遍历所有 iframe，根据 src 和 dom 上下文匹配
  const allIframes = doc.querySelectorAll('iframe');
  for (const iframe of Array.from(allIframes)) {
    if (!(iframe instanceof HTMLIFrameElement)) continue;
    if (!iframe.src.includes('租借男友')) continue;

    // 向上找消息容器，读取其 mesid / data-message-id
    const container =
      iframe.closest('[mesid]') ??
      iframe.closest('[data-message-id]') ??
      iframe.closest('[data-id]');
    if (container) {
      const idAttr =
        container.getAttribute('mesid') ??
        container.getAttribute('data-message-id') ??
        container.getAttribute('data-id');
      if (idAttr && parseInt(idAttr, 10) === floorId) return iframe;
    }
  }

  return null;
}

/**
 * 切换到指定楼层
 *
 * 流程:
 *   exitFullscreen → 等待 → scrollIntoView → 等待 → target.requestFullscreen
 */
export async function switchToFloor(floorId: number): Promise<boolean> {
  const currentId = getCurrentFloorId();
  if (currentId === floorId) return false;

  const targetIframe = findFloorIframe(floorId);
  if (!targetIframe) {
    console.warn(`[floorNav] 找不到楼层 ${floorId} 的 iframe，尝试回退到基本滚动`);
    try {
      const doc = window.parent.document;
      // 简单滚动到目标（不切换全屏归属）
      const container =
        doc.querySelector(`[mesid="${floorId}"]`) ??
        doc.querySelector(`[data-message-id="${floorId}"]`);
      if (container) container.scrollIntoView({ behavior: 'instant' });
    } catch {
      /* 放弃 */
    }
    return false;
  }

  // 1. 退出当前全屏
  const wasFullscreen = !!document.fullscreenElement;
  if (wasFullscreen) {
    try {
      await document.exitFullscreen();
    } catch {
      /* exit 可能被浏览器拒绝 */
    }
    // 等待退出动画完成
    await new Promise((r) => setTimeout(r, 150));
  }

  // 2. 滚动到目标楼层
  try {
    const container =
      targetIframe.closest('[mesid]') ??
      targetIframe.closest('[data-message-id]') ??
      targetIframe;
    container.scrollIntoView({ behavior: 'instant', block: 'center' });
    await new Promise((r) => setTimeout(r, 100));
  } catch {
    /* 滚动失败不影响后续 */
  }

  // 3. 目标 iframe 进入全屏
  try {
    const targetDoc = targetIframe.contentDocument?.documentElement;
    if (targetDoc) {
      await targetDoc.requestFullscreen();
      console.info(`[floorNav] 已切换到楼层 ${floorId}`);
      return true;
    }
  } catch (e) {
    console.warn('[floorNav] 目标 iframe 全屏失败:', e);
  }

  // 回退：重新对当前文档全屏
  if (wasFullscreen) {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* 放弃 */
    }
  }

  return false;
}