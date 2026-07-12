/**
 * 游戏化视图脚本（修正版）
 *
 * 职责:
 *   1. 始终隐藏用户消息楼层
 *   2. 响应前端全屏请求: 按需创建临时覆盖层 → 移入最新前端 iframe → 全屏
 *   3. 全屏期间新 AI 回复静默更新覆盖层内容
 *   4. 退出全屏时销毁覆盖层并恢复原状
 *
 * 正常态完全透明，不创建任何覆盖层、不干预酒馆界面。
 */

// ---------------------------------------------------------------------------
// 状态
// ---------------------------------------------------------------------------

/** 是否处于游戏全屏模式 */
let isGameFullscreen = false;

// ---------------------------------------------------------------------------
// 用户消息隐藏（始终生效）
// ---------------------------------------------------------------------------

function hideUserMessages(): void {
  $('.mes[is_user="true"]').hide();
}

// ---------------------------------------------------------------------------
// 全屏: 进入
// ---------------------------------------------------------------------------

function enterFullscreen(): void {
  if (isGameFullscreen) return;

  const $latestIframe = $('.TH-render iframe').last();
  if (!$latestIframe.length) {
    toastr.warning('暂无可用的前端界面');
    return;
  }

  // 创建临时覆盖层
  const $overlay = $('<div id="game-overlay">').css({
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    background: '#1a1a2e',
    overflow: 'hidden',
  }).appendTo('body');

  // 退出全屏按钮
  $('<button>')
    .attr('title', '退出全屏')
    .css({
      position: 'absolute',
      top: '8px',
      right: '8px',
      zIndex: '100000',
      width: '32px',
      height: '32px',
      background: 'rgba(255,255,255,0.08)',
      color: 'rgba(255,255,255,0.5)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
    })
    .text('\u26F6')
    .on('click', () => requestExitFullscreen())
    .appendTo($overlay);

  // 将最新前端 iframe 移入覆盖层
  $latestIframe
    .css({ width: '100%', height: '100%', border: 'none' })
    .appendTo($overlay);

  // 全屏覆盖层
  const overlayEl = document.getElementById('game-overlay')!;
  overlayEl.requestFullscreen().then(() => {
    isGameFullscreen = true;
    console.info('[游戏化视图] 已进入全屏');
  }).catch(() => {
    $('#game-overlay').remove();
    toastr.warning('全屏请求被浏览器拒绝');
  });
}

// ---------------------------------------------------------------------------
// 全屏: 退出
// ---------------------------------------------------------------------------

/** 前端按钮或 postMessage 触发: 请求浏览器退出全屏 */
function requestExitFullscreen(): void {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  // 真正的清理在 fullscreenchange 中执行
}

/** 浏览器全屏变化后的清理: 移回 iframe, 销毁覆盖层 */
function cleanupAfterFullscreenExit(): void {
  const $iframe = $('#game-overlay iframe');
  const $target = $('.TH-render').last();
  if ($iframe.length && $target.length) {
    $iframe.css({ width: '', height: '', border: '' }).appendTo($target);
  }
  $('#game-overlay').remove();
  isGameFullscreen = false;
  console.info('[游戏化视图] 已退出全屏');
}

// ---------------------------------------------------------------------------
// 全屏期间: 新消息静默更新
// ---------------------------------------------------------------------------

function updateOverlayIfFullscreen(): void {
  if (!isGameFullscreen) return;

  const $overlay = $('#game-overlay');
  if (!$overlay.length) return;

  const $overlayIframe = $overlay.find('iframe');
  const $latestIframe = $('.TH-render iframe').last();
  if (!$latestIframe.length) return;

  // 同一 DOM 节点说明 iframe 已经移入覆盖层，没有新前端
  if ($overlayIframe.length && $overlayIframe[0] === $latestIframe[0]) return;

  // 替换为新 iframe
  $overlayIframe.remove();
  $latestIframe
    .css({ width: '100%', height: '100%', border: 'none' })
    .appendTo($overlay);

  console.info('[游戏化视图] 全屏内容已更新');
}

// ---------------------------------------------------------------------------
// 初始化 & 卸载
// ---------------------------------------------------------------------------

function init(): void {
  console.info('[游戏化视图] 初始化');

  // 始终隐藏已有用户消息
  hideUserMessages();

  // 新用户消息渲染后立即隐藏
  eventOn(tavern_events.USER_MESSAGE_RENDERED, () => {
    hideUserMessages();
  });

  // 全屏期间有新前端 → 静默更新覆盖层
  eventOn(iframe_events.MESSAGE_IFRAME_RENDER_ENDED, () => {
    updateOverlayIfFullscreen();
  });

  // 前端全屏按钮 → postMessage → 切换全屏
  window.parent.addEventListener('message', (e: MessageEvent) => {
    if (e.data?.type === 'toggle-fullscreen') {
      if (isGameFullscreen) {
        requestExitFullscreen();
      } else {
        enterFullscreen();
      }
    }
  });

  // 浏览器全屏变化 (Escape 键 / F11 等)
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && isGameFullscreen) {
      cleanupAfterFullscreenExit();
    }
  });

  toastr.success('游戏化视图已启用');
}

$(() => {
  errorCatched(init)();
});

$(window).on('pagehide', () => {
  if (isGameFullscreen) {
    cleanupAfterFullscreenExit();
  }
  $('.mes[is_user="true"]').show();
  console.info('[游戏化视图] 已卸载');
});