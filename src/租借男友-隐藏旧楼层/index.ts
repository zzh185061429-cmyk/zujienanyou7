// 隐藏旧楼层的前端界面（.TH-render 容器），只保留最新楼层的前端显示
// DOM 结构: .mes > .mes_block > .mes_text > .TH-render > iframe
// 使用 MESSAGE_IFRAME_RENDER_ENDED 而非 MESSAGE_RECEIVED，
// 因为前端 iframe 是在消息接收后通过正则替换才插入 DOM 的

function hideOldFrontends() {
  const $all = $('.TH-render');

  console.info(`[隐藏旧楼层] 扫描到 ${$all.length} 个 .TH-render 容器`);

  if ($all.length <= 1) return;

  $all.hide();
  $all.last().show();

  console.info(`[隐藏旧楼层] 已隐藏 ${$all.length - 1} 个旧前端，保留最新楼层`);
}

function init() {
  console.info('[隐藏旧楼层] 初始化中...');

  toastr.success('隐藏旧楼层脚本已加载', '租借男友');

  hideOldFrontends();

  // iframe 渲染完成后触发，此时 .TH-render 已在 DOM 中
  eventOn(iframe_events.MESSAGE_IFRAME_RENDER_ENDED, (iframe_name: string) => {
    console.info(`[隐藏旧楼层] iframe 渲染完成: ${iframe_name}`);
    hideOldFrontends();
  });
}

$(() => {
  errorCatched(init)();
});

// 卸载时恢复所有被隐藏的前端容器
$(window).on('pagehide', () => {
  $('.TH-render').show();
  console.info('[隐藏旧楼层] 脚本已卸载，已恢复所有前端显示');
});