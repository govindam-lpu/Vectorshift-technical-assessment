import { Handle } from 'reactflow';
import { motion } from 'framer-motion';


//each node get's their own colors from here
const nodeAccentColors = {
  'Input': '#6366f1',
  'Output': '#10b981',
  'LLM': '#f59e0b',
  'Text': '#3b82f6',
  'Math Operation': '#ec4899',
  'Webhook/API Integration': '#14b8a6',
  'Prompt Optimizer': '#8b5cf6',
  'Parse JSON Data': '#f97316',
  'Conditional': '#ef4444',
};

//title, handles, children and style are passed for the specific node type
export const BaseNode = ({ title, handles = [], children, style = {} }) => {
  const accent = nodeAccentColors[title] || '#6366f1';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white rounded-xl shadow-lg border border-slate-200 min-w-[200px] font-inter overflow-visible"
      style={{ borderLeft: `3px solid ${accent}`, ...style }}
>
      {/* header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: accent }}
        />
        <span className="text-xs font-semibold text-slate-700 tracking-wide">
          {title}
        </span>
      </div>

      {/* body */}
      <div className="px-3 py-2.5 flex flex-col gap-2">
        {children}
      </div>

      {/* handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </motion.div>
  );
};

// reusable field components for nodes
export const NodeField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
      {label}
    </label>  
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-2 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all"
  />
);

export const NodeSelect = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-2 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-indigo-400 transition-all cursor-pointer"
  >
    {children}
  </select>
);