import React from 'react';
import { Volume2, Monitor, Globe, HardDrive } from 'lucide-react';
import { Button } from '../ui/Button';

export const SettingsModal: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 text-white h-full p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Audio */}
        <div className="space-y-4">
          <h3 className="font-display font-black text-pop-yellow flex items-center gap-2 border-b border-white/10 pb-2">
            <Volume2 size={18} /> 音频设置 (AUDIO)
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm"><label>主音量</label><span>80%</span></div>
              <input type="range" className="w-full accent-pop-yellow" defaultValue={80} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm"><label>语音</label><span>100%</span></div>
              <input type="range" className="w-full accent-pop-yellow" defaultValue={100} />
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="space-y-4">
          <h3 className="font-display font-black text-pop-cyan flex items-center gap-2 border-b border-white/10 pb-2">
            <Monitor size={18} /> 显示设置 (DISPLAY)
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <label>全屏模式</label>
              <input type="checkbox" className="w-4 h-4 accent-pop-cyan" defaultChecked />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label>动态特效 (微交互动画)</label>
              <input type="checkbox" className="w-4 h-4 accent-pop-cyan" defaultChecked />
            </div>
          </div>
        </div>

        {/* System */}
        <div className="space-y-4 md:col-span-2 mt-4">
           <h3 className="font-display font-black text-pop-pink flex items-center gap-2 border-b border-white/10 pb-2">
            <HardDrive size={18} /> 系统操作 (SYSTEM)
          </h3>
          <div className="flex gap-4">
            <Button variant="outline" className="border-pop-cyan text-pop-cyan hover:bg-pop-cyan hover:text-pop-dark flex-1">
              保存进度
            </Button>
            <Button variant="outline" className="border-pop-yellow text-pop-yellow hover:bg-pop-yellow hover:text-pop-dark flex-1">
              读取进度
            </Button>
            <Button variant="danger" className="flex-1">
              返回标题
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
