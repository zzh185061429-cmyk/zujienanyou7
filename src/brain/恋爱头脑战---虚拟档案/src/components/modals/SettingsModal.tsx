import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Volume2, VolumeX, Monitor, Type } from 'lucide-react';
import { useToast } from '../ui/ToastContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { addToast } = useToast();
  const [bgm, setBgm] = useState(80);
  const [sfx, setSfx] = useState(100);
  const [textSpeed, setTextSpeed] = useState(2); // 1: slow, 2: normal, 3: fast

  const handleSave = () => {
    addToast({
      title: '设置已保存',
      description: '系统配置已更新。',
      type: 'success'
    });
    onClose();
  };

  const Slider = ({ label, value, onChange, icon: Icon }: any) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/70 font-serif flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          {label}
        </span>
        <span className="text-sm font-mono text-white/50">{value}%</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-white/10 appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:transform [&::-webkit-slider-thumb]:rotate-45"
      />
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SYSTEM SETTINGS" className="max-w-md">
      <div className="space-y-8">
        
        {/* Audio Settings */}
        <div>
          <h3 className="text-xs font-mono tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">AUDIO</h3>
          <Slider label="背景音乐 (BGM)" value={bgm} onChange={setBgm} icon={bgm === 0 ? VolumeX : Volume2} />
          <Slider label="音效 (SFX)" value={sfx} onChange={setSfx} icon={sfx === 0 ? VolumeX : Volume2} />
        </div>

        {/* Text Settings */}
        <div>
          <h3 className="text-xs font-mono tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">DISPLAY & TEXT</h3>
          <div className="mb-4">
            <span className="text-sm text-white/70 font-serif flex items-center gap-2 mb-2">
              <Type className="w-4 h-4 text-primary" />
              文本显示速度
            </span>
            <div className="flex gap-2">
              {[1, 2, 3].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setTextSpeed(speed)}
                  className={`flex-1 py-2 font-serif text-sm transition-colors border ${
                    textSpeed === speed 
                      ? 'bg-primary/20 border-primary text-primary' 
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {speed === 1 ? '缓慢' : speed === 2 ? '正常' : '迅速'}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 text-sm font-serif text-white/50 hover:text-white transition-colors">
            取消
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-primary text-white font-serif text-sm hover:bg-primary-dark transition-colors transform -skew-x-12 relative overflow-hidden group">
            <span className="relative z-10 transform skew-x-12 inline-block">保存设定</span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:animate-[shine_0.5s_ease-in-out]" />
          </button>
        </div>

      </div>
    </Modal>
  );
}
