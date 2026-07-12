import { motion } from 'motion/react';
import { Heart, Play, FileText, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

interface TitleScreenProps {
  onStart: () => void;
  onOpenArchive: () => void;
  onOpenSettings: () => void;
}

export function TitleScreen({ onStart, onOpenArchive, onOpenSettings }: TitleScreenProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden halftone-bg">
      {/* Dramatic diagonal background split */}
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 w-1/2 bg-black border-r-4 border-primary transform -skew-x-12 -translate-x-32 hidden md:block"
      />

      {/* Background decorative elements */}
      <motion.div 
        initial={{ rotate: -45, scale: 0 }}
        animate={{ rotate: 15, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -right-20 md:-right-10 -top-20 text-primary opacity-20 pointer-events-none"
      >
        <Heart className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] fill-current" />
      </motion.div>
      <motion.div 
        initial={{ rotate: 45, scale: 0 }}
        animate={{ rotate: -15, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute -left-20 -bottom-20 text-white opacity-5 pointer-events-none"
      >
        <Heart className="w-96 h-96 fill-current" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6 px-6 py-2 border border-primary/50 text-primary font-serif tracking-widest text-sm md:text-base transform -skew-x-12 bg-black/50 backdrop-blur-sm"
        >
          天才们的恋爱头脑战
        </motion.div>
        
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
          className="text-5xl md:text-8xl font-serif font-black text-light tracking-tighter mb-4 flex flex-col md:flex-row items-center drop-shadow-2xl"
        >
          <span>虚拟档案</span>
          <span className="text-primary mx-4 hidden md:inline">•</span>
          <span className="text-primary text-4xl md:text-7xl mt-2 md:mt-0">恋爱物语</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100px" }}
          transition={{ duration: 1, delay: 1.2 }}
          className="h-1 bg-primary mb-8"
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-lg md:text-2xl text-white/60 font-serif mb-16 tracking-[0.2em]"
        >
          ——先告白的人就输了——
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-center"
        >
          <Button size="lg" onClick={onStart} className="group text-xl tracking-widest w-48">
            <span>开始宣战</span>
            <Play className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex gap-4">
            <Button variant="outline" size="icon" onClick={onOpenArchive} title="档案" className="w-12 h-12">
              <FileText className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={onOpenSettings} title="设置" className="w-12 h-12">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-white/20 text-xs md:text-sm font-sans tracking-widest pointer-events-none">
        SYSTEM VER. PRO MAX
      </div>
    </div>
  );
}
