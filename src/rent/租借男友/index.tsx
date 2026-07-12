import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import './src/index.css';

// 前端界面运行在 iframe 中，script type="module" 默认 defer，DOM 已就绪
// 不使用 jQuery $ 是因为 iframe 自身 window 上没有 $（仅在 parent 上）
const root = createRoot(document.getElementById('root')!);
root.render(<App />);

window.addEventListener('pagehide', () => {
  root.unmount();
});