/**
 * 悬浮输入球 — 始终可见的浮动输入入口（租借男友全屏输入伴侣）
 *
 * 状态机：
 *   collapsed ──点击──→ expanded ──发送──→ awaiting ──AI回复──→ collapsed
 *       ↑                    │                    │
 *       └──点击──────┘        └──点击（可中断等待）──┘
 */

// ── iframe 内 UI（纯 HTML，利用 srcdoc 中的 tailwind + fontawesome）──
const BALL_HTML = /* html */ `
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    overflow: hidden;
    background: transparent;
    font-family: 'Noto Sans SC', sans-serif;
    width: 100%; height: 100%;
  }
  .ball {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff3366, #ff6699);
    border: 3px solid #1a1a1a;
    box-shadow: 4px 4px 0 #1a1a1a, 0 0 20px rgba(255, 51, 102, 0.4);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    position: relative;
    overflow: hidden;
  }
  .ball:active { transform: scale(0.9); }
  .ball.awaiting {
    background: linear-gradient(135deg, #00E5FF, #00B8D4);
    box-shadow: 4px 4px 0 #1a1a1a, 0 0 24px rgba(0, 229, 255, 0.5);
  }
  .ball.awaiting::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #fff;
    animation: spin 1s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .ball i { color: #fff; font-size: 24px; text-shadow: 2px 2px 0 rgba(0,0,0,0.3); }

  /* 展开面板 */
  .panel {
    display: none;
    width: 300px;
    background: #1a1a1a;
    border: 3px solid #00E5FF;
    border-radius: 16px;
    box-shadow: 6px 6px 0 #00E5FF, 0 0 30px rgba(0,229,255,0.3);
    padding: 12px;
    flex-direction: column;
    gap: 8px;
  }
  .panel.show { display: flex; }
  .panel textarea {
    width: 100%; min-height: 80px;
    background: rgba(255,255,255,0.08);
    border: 2px solid rgba(255,255,255,0.15);
    border-radius: 10px;
    color: #fff;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    resize: none;
    outline: none;
    font-family: inherit;
  }
  .panel textarea:focus { border-color: #ff3366; }
  .panel textarea::placeholder { color: rgba(255,255,255,0.3); }
  .panel .actions {
    display: flex; gap: 8px; justify-content: flex-end;
  }
  .panel button {
    padding: 8px 18px;
    border-radius: 25px;
    border: 2px solid #1a1a1a;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.1s, filter 0.1s;
    font-family: inherit;
  }
  .panel button:active { transform: scale(0.95); }
  .panel .btn-send {
    background: #ff3366; color: #fff;
    box-shadow: 3px 3px 0 #1a1a1a;
  }
  .panel .btn-cancel {
    background: rgba(255,255,255,0.1); color: #aaa;
  }
  .panel .btn-send:hover { filter: brightness(1.15); }
</style>

<div id="container" style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">

  <!-- 收起态：悬浮球 -->
  <div id="ball" class="ball">
    <i class="fas fa-comment-dots"></i>
  </div>

  <!-- 展开态：输入面板 -->
  <div id="panel" class="panel">
    <textarea id="input" placeholder="输入你想说的话... (Enter 发送)"></textarea>
    <div class="actions">
      <button class="btn-cancel" id="btn-cancel">取消</button>
      <button class="btn-send" id="btn-send">
        <i class="fas fa-paper-plane"></i> 发送
      </button>
    </div>
  </div>

</div>

<script>
  (function() {
    var ball = document.getElementById('ball');
    var panel = document.getElementById('panel');
    var input = document.getElementById('input');
    var btnSend = document.getElementById('btn-send');
    var btnCancel = document.getElementById('btn-cancel');
    var isExpanded = false;
    var isAwaiting = false;

    function post(type, data) {
      window.parent.postMessage({ source: 'float-ball', type: type, data: data }, '*');
    }

    // 切换展开/收起
    function toggle() {
      if (isAwaiting) {
        isAwaiting = false;
        ball.classList.remove('awaiting');
        isExpanded = true;
        panel.classList.add('show');
        input.focus();
        post('resize', { w: 300, h: 210 });
        return;
      }
      isExpanded = !isExpanded;
      if (isExpanded) {
        panel.classList.add('show');
        input.focus();
        post('resize', { w: 300, h: 210 });
      } else {
        panel.classList.remove('show');
        post('resize', { w: 56, h: 56 });
      }
    }

    function sendText() {
      var text = input.value.trim();
      if (!text) return;

      post('send', text);
      input.value = '';
      isExpanded = false;
      panel.classList.remove('show');
      isAwaiting = true;
      ball.classList.add('awaiting');
      post('resize', { w: 56, h: 56 });
    }

    // 收到回复通知
    window.addEventListener('message', function(e) {
      if (!e.data || e.data.source !== 'float-ball-parent') return;
      if (e.data.type === 'response') {
        isAwaiting = false;
        ball.classList.remove('awaiting');
      }
    });

    ball.addEventListener('click', toggle);
    btnSend.addEventListener('click', sendText);
    btnCancel.addEventListener('click', toggle);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendText();
      }
    });
  })();
</script>
`;

$(() => {
  // 等待 MVU 就绪（如果可用）
  let mvuReady = false;
  waitGlobalInitialized('Mvu')
    .then(() => { mvuReady = true; })
    .catch(() => { /* MVU 不可用 */ });

  // 创建悬浮球 iframe
  const $iframe = createScriptIdIframe()
    .css({
      position: 'fixed',
      right: '16px',
      bottom: '140px',
      width: '56px',
      height: '56px',
      zIndex: 99999,
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
    })
    .appendTo('body')
    .on('load', () => {
      const doc = $iframe[0].contentDocument!;
      // 禁用自动高度调整
      const style = doc.createElement('style');
      style.textContent = 'html,body{height:auto!important;min-height:auto!important;width:auto!important;}';
      doc.head.appendChild(style);
      // 注入 UI
      doc.body.innerHTML = BALL_HTML;
    });

  // 监听 iframe 内消息
  $(window).on('message', (e: JQuery.Event) => {
    const evt = (e.originalEvent || e) as MessageEvent;
    const data = evt.data;
    if (!data || data.source !== 'float-ball') return;

    if (data.type === 'resize') {
      $iframe.css({
        width: data.data.w + 'px',
        height: data.data.h + 'px',
      });
    } else if (data.type === 'send') {
      const text = data.data as string;
      const $textarea = $('#send_textarea');
      if ($textarea.length) {
        $textarea.val(text).trigger('input');
        setTimeout(() => $('#send_but').click(), 150);
        console.info('[悬浮输入] 已发送:', text.slice(0, 30));
      }
      startAwaitingResponse($iframe);
    }
  });

  // jQuery UI 可拖动
  if (typeof $iframe.draggable === 'function') {
    $iframe.draggable({
      containment: 'window',
      scroll: false,
      start: () => $iframe.css({ transition: 'none' }),
      stop: () => $iframe.css({ transition: '' }),
    });
  }

  // ── 等待 AI 回复 ──
  function startAwaitingResponse($ifr: JQuery<HTMLIFrameElement>) {
    let resolved = false;

    const resolve = () => {
      if (resolved) return;
      resolved = true;
      if (pollTimer) clearInterval(pollTimer);
      if (eventStop) eventStop.stop();
      $ifr[0].contentWindow?.postMessage(
        { source: 'float-ball-parent', type: 'response' },
        '*'
      );
    };

    // 方式1：MVU 变量更新事件（主要）
    let eventStop: EventOnReturn | null = null;
    if (mvuReady) {
      try {
        eventStop = eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
          console.info('[悬浮输入] MVU 变量更新 → 回复到达');
          resolve();
        });
      } catch {
        // MVU 事件注册失败，走轮询兜底
      }
    }

    // 方式2：轮询最新聊天消息数量（兜底）
    let lastCount = -1;
    try {
      const msgId = getCurrentMessageId();
      if (msgId != null) {
        const msgs = getChatMessages(msgId);
        lastCount = Array.isArray(msgs) ? msgs.length : 0;
      }
    } catch { /* ignore */ }

    const pollTimer = setInterval(() => {
      try {
        const msgId = getCurrentMessageId();
        if (msgId == null) return;
        const msgs = getChatMessages(msgId);
        const count = Array.isArray(msgs) ? msgs.length : 0;
        if (lastCount >= 0 && count > lastCount) {
          console.info('[悬浮输入] 新消息到达 → 回复完成');
          resolve();
        }
        lastCount = count;
      } catch { /* ignore */ }
    }, 2000);

    // 60 秒超时
    setTimeout(resolve, 60000);
  }

  // 卸载
  $(window).on('pagehide', () => {
    $iframe.remove();
  });
});