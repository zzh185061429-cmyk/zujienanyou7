// ---- 注入样式到父页面 ----
const STYLE_ID = 'floating-ball-style';

$(() => {
  // 避免重复注入样式
  if (!$(`#${STYLE_ID}`).length && $('head').length) {
    $('head').append($(`<style id="${STYLE_ID}"></style>`).text(`
      .fb-container { position: fixed; z-index: 2147483647; }
      .fb-ball {
        width: 56px; height: 56px; border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        box-shadow: 0 4px 16px rgba(124,58,237,0.4);
        display: flex; align-items: center; justify-content: center;
        cursor: grab; color: #fff; font-size: 20px;
        transition: transform 0.15s, box-shadow 0.15s;
        user-select: none; -webkit-user-select: none;
      }
      .fb-ball:hover  { transform: scale(1.12); box-shadow: 0 6px 24px rgba(124,58,237,0.55); }
      .fb-ball:active { cursor: grabbing; transform: scale(1.05); }
      .fb-panel {
        position: absolute; width: 320px; background: #fff;
        border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        overflow: hidden; display: none;
      }
      .fb-panel.show { display: block; animation: fb-panel-in 0.18s ease-out; }
      @keyframes fb-panel-in {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }
      .fb-panel.flip-x { right: auto !important; left: 4px !important; }
      .fb-panel.flip-y { bottom: auto !important; top: 4px !important; }
      .fb-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 14px; background: #f5f3ff;
        border-bottom: 1px solid #ede9fe;
      }
      .fb-title { font-size: 13px; font-weight: 600; color: #6d28d9; }
      .fb-close {
        background: none; border: none; color: #9ca3af; cursor: pointer;
        font-size: 15px; padding: 3px 6px; border-radius: 4px; line-height: 1;
      }
      .fb-close:hover { color: #4b5563; background: #e5e7eb; }
      .fb-textarea {
        display: block; width: 100%; min-height: 80px; max-height: 200px;
        padding: 10px 14px; border: none; outline: none; resize: vertical;
        font-size: 13px; line-height: 1.55; color: #1f2937;
        font-family: inherit; box-sizing: border-box;
      }
      .fb-textarea::placeholder { color: #9ca3af; }
      .fb-footer {
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 14px; border-top: 1px solid #f3f4f6; background: #fafafa;
      }
      .fb-hint { font-size: 11px; color: #9ca3af; }
      .fb-send {
        display: flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        color: #fff; border: none; padding: 6px 18px; border-radius: 6px;
        font-size: 13px; cursor: pointer; font-weight: 500;
        transition: opacity 0.15s;
      }
      .fb-send:hover:not(:disabled) { opacity: 0.85; }
      .fb-send:disabled { opacity: 0.35; cursor: not-allowed; }
    `));
  }
});

// ---- 主逻辑 ----
function init() {
  // 创建容器
  const $container = $('<div class="fb-container"></div>').appendTo('body');

  // 创建悬浮球
  const $ball = $('<div class="fb-ball" title="点击打开快捷输入 / 拖拽移动位置"><i class="fa-solid fa-pen-to-square"></i></div>').appendTo($container);

  // 创建输入面板
  const $panel = $('<div class="fb-panel"><div class="fb-header"><span class="fb-title">快捷输入</span><button class="fb-close" title="收起悬浮球"><i class="fa-solid fa-xmark"></i></button></div><textarea class="fb-textarea" placeholder="在此输入消息..." rows="3"></textarea><div class="fb-footer"><span class="fb-hint">Enter 发送 · Shift+Enter 换行</span><button class="fb-send" disabled>发送</button></div></div>').appendTo($container);

  const $textarea = $panel.find('.fb-textarea');
  const $sendBtn = $panel.find('.fb-send');
  const $closeBtn = $panel.find('.fb-close');

  // ---- 位置 ----
  let ballX = window.innerWidth - 80;
  let ballY = window.innerHeight - 180;
  $container.css({ left: ballX, top: ballY });

  // ---- 拖拽 ----
  let dragOffX = 0;
  let dragOffY = 0;
  let hasDragged = false;
  let expanded = false;

  $ball.on('mousedown', function (e) {
    hasDragged = false;
    dragOffX = e.clientX - ballX;
    dragOffY = e.clientY - ballY;

    function onMove(e: JQuery.MouseMoveEvent) {
      const dx = Math.abs(e.clientX - dragOffX - ballX);
      const dy = Math.abs(e.clientY - dragOffY - ballY);
      if (dx > 3 || dy > 3) hasDragged = true;
      ballX = Math.max(0, Math.min(e.clientX - dragOffX, window.innerWidth - 56));
      ballY = Math.max(0, Math.min(e.clientY - dragOffY, window.innerHeight - 56));
      $container.css({ left: ballX, top: ballY });
    }

    function onUp() {
      $(document).off('mousemove', onMove).off('mouseup', onUp);
      if (!hasDragged) {
        openPanel();
      }
    }

    $(document).on('mousemove', onMove).on('mouseup', onUp);
  });

  function openPanel() {
    expanded = true;
    $ball.hide();
    // 面板在球下方/左方出现
    $panel
      .toggleClass('flip-x', ballX < 320)
      .toggleClass('flip-y', ballY < 200)
      .css({ bottom: '4px', right: '4px' })
      .addClass('show');
    $textarea.focus();
  }

  function closePanel() {
    expanded = false;
    $panel.removeClass('show');
    $ball.show();
  }

  $closeBtn.on('click', closePanel);

  // 输入框内容变化时控制发送按钮
  $textarea.on('input', function () {
    $sendBtn.prop('disabled', !$textarea.val()!.toString().trim());
  });

  // ---- 发送 ----
  let sending = false;

  async function doSend() {
    const msg = $textarea.val()!.toString().trim();
    if (!msg || sending) return;
    sending = true;
    $sendBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin-pulse"></i>');

    try {
      await createChatMessages([{ role: 'user', message: msg }]);
      $textarea.val('');
      closePanel();
      await triggerSlash('/trigger');
    } catch (e: any) {
      toastr.error(e?.message || '发送失败');
    } finally {
      sending = false;
      $sendBtn.prop('disabled', false).text('发送');
    }
  }

  $sendBtn.on('click', doSend);
  $textarea.on('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  });

  // ---- 清理 ----
  $(window).on('pagehide', () => {
    $container.remove();
    $(`#${STYLE_ID}`).remove();
  });
}

$(() => {
  errorCatched(init)();
});