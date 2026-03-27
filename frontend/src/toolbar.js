import { DraggableNode } from './draggableNode';

const nodeColors = {
  customInput: '#6366f1',
  customOutput: '#10b981',
  llm: '#f59e0b',
  text: '#3b82f6',
  math: '#ec4899',
  integration: '#14b8a6',
  promptOptimizer: '#8b5cf6',
  parseNode: '#f97316',
  conditional: '#ef4444',
};

export const Toolbar = () => {
  return (
    <div
  className="flex items-center gap-4 px-6 py-3 z-10"
  style={{
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
  }}
>
  <span className="text-[#6366f1] font-bold text-base tracking-wide whitespace-nowrap">
    Toolbar
  </span>
      <div className="w-px h-8 bg-[#2d3452]" />
      <div className="flex flex-wrap gap-2">
        <DraggableNode type='customInput' label='Input' color={nodeColors.customInput} />
        <DraggableNode type='llm' label='LLM' color={nodeColors.llm} />
        <DraggableNode type='customOutput' label='Output' color={nodeColors.customOutput} />
        <DraggableNode type='text' label='Text' color={nodeColors.text} />
        <DraggableNode type='math' label='Math' color={nodeColors.math} />
        <DraggableNode type='integration' label='Integration' color={nodeColors.integration} />
        <DraggableNode type='promptOptimizer' label='Prompt Optimizer' color={nodeColors.promptOptimizer} />
        <DraggableNode type='parseNode' label='JSON Parser' color={nodeColors.parseNode} />
        <DraggableNode type='conditional' label='Conditional' color={nodeColors.conditional} />
      </div>
    </div>
  );
};