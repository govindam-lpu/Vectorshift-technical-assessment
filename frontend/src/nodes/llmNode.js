import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      handles={[
        { 
          type: 'target', 
          position: Position.Left, 
          id: `${id}-system`, 
          style: { top: '33%' } 
        },
        { 
          type: 'target', 
          position: Position.Left, 
          id: `${id}-prompt`, 
          style: { top: '66%' } 
        },
        { 
          type: 'source', 
          position: Position.Right, 
          id: `${id}-response` 
        },
      ]}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">System</p>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Prompt</p>
      </div>
    </BaseNode>
  );
};