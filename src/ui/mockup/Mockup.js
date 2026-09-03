"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, BarChart2, Users, Bell, Play, Film, Edit3, Image as ImageIcon,
  Layers, Palette, PenTool, Code, Laptop, Database, Globe, Search, ArrowUp,
  Target, DollarSign, ShoppingBag, Eye, Percent
} from 'lucide-react';

// Common animations
const floatAnim = (delay = 0) => ({
  animate: {
    y: [-8, 8, -8],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay,
  }
});

const pulseAnim = {
  animate: {
    opacity: [0.6, 1, 0.6],
    scale: [0.98, 1.02, 0.98]
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// 1. Digital Marketing & Strategy Mockup
export function DigitalMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#090d16] p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,38,255,0.08)_0%,transparent_70%)]" />

      {/* Main Glassmorphic Dashboard Card */}
      <motion.div 
        className="w-11/12 max-w-[360px] rounded-3xl bg-[#0c101f]/80 border border-purple-500/20 shadow-[0_20px_50px_rgba(157,38,255,0.1)] p-5 relative z-10"
        {...floatAnim(0)}
      >
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/10 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] text-purple-400/80 font-bold uppercase tracking-widest">Marketing Hub</span>
        </div>

        {/* Growth Stats Card */}
        <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Campaign CTR</span>
              <h4 className="text-2xl font-black text-white mt-1">12.8%</h4>
            </div>
            <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">+4.2%</span>
          </div>
          
          {/* Animated Bar Chart */}
          <div className="flex items-end space-x-2 mt-4 h-16">
            {[40, 75, 55, 90, 60, 80, 95].map((val, i) => (
              <div key={i} className="flex-1 bg-purple-950/30 rounded-t-md h-full relative overflow-hidden">
                <motion.div 
                  className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#7C3AED] to-[#C084FC] rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Social Bubble 1 */}
        <motion.div 
          className="absolute -top-6 -right-6 bg-gradient-to-br from-[#9D26FF] to-[#7C3AED] text-white p-3 rounded-2xl shadow-lg border border-purple-400/20"
          {...floatAnim(1)}
        >
          <Users size={20} />
        </motion.div>

        {/* Floating Metrics Bubble 2 */}
        <motion.div 
          className="absolute -bottom-4 -left-4 bg-[#12182c]/90 border border-purple-500/30 text-white py-2 px-3 rounded-2xl shadow-lg flex items-center space-x-2"
          {...floatAnim(2)}
        >
          <TrendingUp className="text-green-400" size={16} />
          <span className="text-[11px] font-bold text-gray-200">ROI 3.8x</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// 2. Graphic & Brand Design Mockup
export default function Mockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#090d16] p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.08)_0%,transparent_70%)]" />

      {/* Main Artboard Canvas Card */}
      <motion.div 
        className="w-11/12 max-w-[360px] rounded-3xl bg-[#0c101f]/80 border border-purple-500/20 shadow-[0_20px_50px_rgba(157,38,255,0.1)] p-5 relative z-10"
        {...floatAnim(0.5)}
      >
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/10 pb-3">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Brand Identity</span>
          <div className="flex space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500/40" />
            <span className="w-2 h-2 rounded-full bg-purple-500/40" />
          </div>
        </div>

        {/* Metric Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Designs Delivered</span>
            <h4 className="text-xl font-black text-white mt-1">500+</h4>
            <span className="text-[8px] text-green-400 font-bold">+24% this month</span>
          </div>
          <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Avg. Turnaround</span>
            <h4 className="text-xl font-black text-[#C084FC] mt-1">24h</h4>
            <span className="text-[8px] text-green-400 font-bold">Express Delivery</span>
          </div>
        </div>

        {/* Drawing Canvas */}
        <div className="bg-[#12182c] border border-purple-500/10 rounded-2xl p-3 relative overflow-hidden h-32 flex items-center justify-center">
          {/* Logo wireframe mockup */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Glowing Vector Circle */}
          <svg className="w-24 h-24 relative z-10" viewBox="0 0 100 100">
            <motion.path
              d="M 50 15 A 35 35 0 1 1 49.9 15 Z"
              fill="none"
              stroke="url(#purpleGradient)"
              strokeWidth="2"
              strokeDasharray="220"
              initial={{ strokeDashoffset: 220 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9D26FF" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div 
            className="absolute z-20 text-white bg-purple-600/20 border border-purple-500/30 p-2 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PenTool size={18} className="text-[#C084FC]" />
          </motion.div>
        </div>

        {/* Color Swatch Indicators */}
        <div className="flex space-x-2 mt-3 justify-center">
          {['#9D26FF', '#7C3AED', '#C084FC', '#06B6D4', '#EC4899'].map((col, idx) => (
            <motion.div 
              key={idx}
              className="w-5 h-5 rounded-full border border-white/10"
              style={{ backgroundColor: col }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Layer Floating Box */}
        <motion.div 
          className="absolute -top-6 -left-6 bg-[#12182c]/95 border border-purple-500/30 p-3 rounded-2xl shadow-lg flex items-center space-x-2"
          {...floatAnim(1.2)}
        >
          <Layers className="text-[#C084FC]" size={16} />
          <span className="text-[10px] font-bold text-gray-200 uppercase">Vector Layer</span>
        </motion.div>

        {/* Floating Metric Bubble */}
        <motion.div 
          className="absolute -bottom-4 -right-4 bg-[#12182c]/90 border border-purple-500/30 text-white py-2 px-3 rounded-2xl shadow-lg flex items-center space-x-2"
          {...floatAnim(1.8)}
        >
          <Palette className="text-[#C084FC]" size={16} />
          <span className="text-[11px] font-bold text-gray-200">Satisfaction 99.4%</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// 3. Web Development Mockup
export function DevMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#090d16] p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08)_0%,transparent_70%)]" />

      {/* Main Laptop Screen Mockup */}
      <motion.div 
        className="w-11/12 max-w-[360px] rounded-3xl bg-[#0c101f]/80 border border-purple-500/20 shadow-[0_20px_50px_rgba(157,38,255,0.1)] p-4 relative z-10"
        {...floatAnim(0.8)}
      >
        {/* Mock Code Editor Header */}
        <div className="flex items-center justify-between mb-3 border-b border-purple-500/10 pb-2 text-[10px] text-gray-400 font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span>App.js - Next.js</span>
        </div>

        {/* Code Content Area */}
        <div className="bg-[#12182c] border border-purple-500/10 rounded-2xl p-4 font-mono text-xs text-purple-200/80 leading-relaxed overflow-hidden h-40">
          <span className="text-[#9D26FF] block">import {"{"} useState {"}"} from &apos;react&apos;;</span>
          <span className="text-gray-400 block mt-1">const DerixioApp = () =&gt; {"{"}</span>
          <span className="text-purple-400 block ml-4">const [build, setBuild] = useState(true);</span>
          <span className="text-yellow-400 block ml-4 mt-1">return (</span>
          <span className="text-purple-300 block ml-8">&lt;InteractiveUI speed=&quot;blazing&quot;&gt;</span>
          <span className="text-green-400 block ml-12">&lt;h1&gt;Scalable Tech&lt;/h1&gt;</span>
          <span className="text-purple-300 block ml-8">&lt;/InteractiveUI&gt;</span>
          <span className="text-yellow-400 block ml-4">);</span>
          <span className="text-gray-400 block">{"};"}</span>
        </div>

        {/* Floating Database Card */}
        <motion.div 
          className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#7C3AED] to-[#C084FC] p-3.5 rounded-2xl shadow-lg border border-purple-400/20 text-white"
          {...floatAnim(1.5)}
        >
          <Code size={20} />
        </motion.div>

        {/* Floating Web Service Indicator */}
        <motion.div 
          className="absolute -top-6 -left-6 bg-[#12182c]/95 border border-purple-500/30 py-2.5 px-3 rounded-2xl shadow-lg flex items-center space-x-2"
          {...floatAnim(0.2)}
        >
          <Globe className="text-purple-400 animate-spin" style={{ animationDuration: '6s' }} size={16} />
          <span className="text-[10px] font-bold text-gray-200">API ACTIVE</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// 4. SEO Optimization Mockup
export function LandingMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#090d16] p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,38,255,0.08)_0%,transparent_70%)]" />

      {/* Main Glassmorphic Dashboard Card */}
      <motion.div 
        className="w-11/12 max-w-[360px] rounded-3xl bg-[#0c101f]/80 border border-purple-500/20 shadow-[0_20px_50px_rgba(157,38,255,0.1)] p-5 relative z-10"
        {...floatAnim(1)}
      >
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/10 pb-3">
          <div className="flex items-center space-x-2">
            <Search className="text-purple-400" size={14} />
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">SEO Audit Panel</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>

        {/* Search Rank Card */}
        <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Organic Keyword Search</span>
            <ArrowUp className="text-green-400" size={14} />
          </div>
          
          <div className="bg-[#090d16] border border-purple-500/10 py-2 px-3 rounded-xl flex items-center justify-between mb-2">
            <span className="text-xs text-white font-medium">Digital Agency</span>
            <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded">Rank #1</span>
          </div>

          <div className="bg-[#090d16] border border-purple-500/10 py-2 px-3 rounded-xl flex items-center justify-between">
            <span className="text-xs text-white/70 font-medium">Growth Studio</span>
            <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded">Rank #2</span>
          </div>
        </div>

        {/* Speed Performance Meter */}
        <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-semibold uppercase">Core Web Vitals</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-black text-green-400">98/100</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          </div>
        </div>

        {/* Floating Rank Bubble */}
        <motion.div 
          className="absolute -top-6 -right-6 bg-gradient-to-br from-[#9D26FF] to-[#7C3AED] text-white p-3 rounded-2xl shadow-lg border border-purple-400/20"
          {...floatAnim(1.4)}
        >
          <TrendingUp size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// 5. Amazon PPC Management Mockup
export function AmazonPPCMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#090d16] p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.08)_0%,transparent_70%)]" />

      {/* Main Amazon PPC Card */}
      <motion.div 
        className="w-11/12 max-w-[360px] rounded-3xl bg-[#0c101f]/80 border border-purple-500/20 shadow-[0_20px_50px_rgba(157,38,255,0.1)] p-5 relative z-10"
        {...floatAnim(0.4)}
      >
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/10 pb-3">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-[#C084FC]" size={14} />
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Amazon PPC Dashboard</span>
          </div>
          <span className="text-[10px] text-yellow-500 font-extrabold uppercase">Live Ads</span>
        </div>

        {/* ACoS & ROAS Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase">Average ACoS</span>
            <h4 className="text-xl font-black text-[#C084FC] mt-1">14.6%</h4>
            <span className="text-[8px] text-green-400 font-bold">-5.2% Drop</span>
          </div>
          <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase">Target ROAS</span>
            <h4 className="text-xl font-black text-white mt-1">4.8x</h4>
            <span className="text-[8px] text-green-400 font-bold">+1.2x Up</span>
          </div>
        </div>

        {/* Sales Curve Graph */}
        <div className="bg-[#12182c] border border-purple-500/10 rounded-2xl p-3 relative overflow-hidden h-24 flex items-end">
          <div className="absolute top-2 left-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase">Conversion Sales</span>
          </div>
          
          {/* Custom SVG line chart for PPC growth */}
          <svg className="w-full h-12 relative z-10" viewBox="0 0 100 30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="graphGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9D26FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9D26FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 L0,22 Q15,25 30,15 T60,8 T90,3 L100,2 L100,30 Z"
              fill="url(#graphGlow)"
            />
            <motion.path
              d="M0,22 Q15,25 30,15 T60,8 T90,3 L100,2"
              fill="none"
              stroke="#9D26FF"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
        </div>

        {/* Target Floating Box */}
        <motion.div 
          className="absolute -top-6 -left-6 bg-gradient-to-br from-[#9D26FF] to-[#7C3AED] text-white p-3.5 rounded-2xl shadow-lg border border-purple-400/20"
          {...floatAnim(1.1)}
        >
          <Target size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// 6. Video Editing & Motion Design Mockup
export function VideoEditingMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#090d16] p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,38,255,0.08)_0%,transparent_70%)]" />

      {/* Main Timeline Card */}
      <motion.div 
        className="w-11/12 max-w-[360px] rounded-3xl bg-[#0c101f]/80 border border-purple-500/20 shadow-[0_20px_50px_rgba(157,38,255,0.1)] p-5 relative z-10"
        {...floatAnim(0.6)}
      >
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/10 pb-3">
          <div className="flex items-center space-x-2">
            <Film className="text-[#C084FC]" size={14} />
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Timeline Editor</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] text-red-500 font-bold uppercase">REC</span>
          </div>
        </div>

        {/* Metric Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Avg. Retention</span>
            <h4 className="text-xl font-black text-white mt-1">85%</h4>
            <span className="text-[8px] text-green-400 font-bold">+18% vs Industry</span>
          </div>
          <div className="bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Avg. Turnaround</span>
            <h4 className="text-xl font-black text-[#C084FC] mt-1">48h</h4>
            <span className="text-[8px] text-green-400 font-bold">Fast Export</span>
          </div>
        </div>

        {/* Video Preview Panel */}
        <div className="bg-[#12182c] border border-purple-500/10 rounded-2xl relative overflow-hidden h-28 flex items-center justify-center mb-3">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('/assets/b2.jpg')` }} />
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] flex items-center justify-center shadow-lg border border-purple-400/30 cursor-pointer relative z-10"
            whileHover={{ scale: 1.1 }}
          >
            <Play fill="white" className="text-white ml-0.5" size={16} />
          </motion.div>
        </div>

        {/* Timeline Tracks */}
        <div className="space-y-2 bg-[#12182c]/80 border border-purple-500/10 rounded-2xl p-2.5">
          {/* Video track */}
          <div className="flex items-center space-x-2">
            <span className="text-[8px] text-purple-400 font-bold uppercase w-8">Video</span>
            <div className="flex-1 h-2.5 bg-purple-950/40 rounded-full relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-[15%] w-[60%] h-full bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] rounded-full"
                animate={{ left: ['15%', '25%', '15%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          {/* Audio track */}
          <div className="flex items-center space-x-2">
            <span className="text-[8px] text-purple-400 font-bold uppercase w-8">Audio</span>
            <div className="flex-1 h-2.5 bg-purple-950/40 rounded-full relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-[30%] w-[45%] h-full bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] rounded-full"
                animate={{ left: ['30%', '40%', '30%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* Float Animation Icon */}
        <motion.div 
          className="absolute -top-6 -left-6 bg-gradient-to-br from-[#7C3AED] to-[#C084FC] text-white p-3 rounded-2xl shadow-lg border border-purple-400/20"
          {...floatAnim(1.3)}
        >
          <Film size={20} />
        </motion.div>

        {/* Floating Metric Bubble */}
        <motion.div 
          className="absolute -bottom-4 -right-4 bg-[#12182c]/90 border border-purple-500/30 text-white py-2 px-3 rounded-2xl shadow-lg flex items-center space-x-2"
          {...floatAnim(1.7)}
        >
          <TrendingUp className="text-green-400" size={16} />
          <span className="text-[11px] font-bold text-gray-200">4K 60FPS</span>
        </motion.div>
      </motion.div>
    </div>
  );
}