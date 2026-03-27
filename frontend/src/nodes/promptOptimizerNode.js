import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, NodeSelect } from './baseNode';

export const PromptNode = ({ id }) => {
  const [prompt, setPrompt] = useState('clarity');

  return (
    <BaseNode
      title="Prompt Optimizer"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-rawprompt` },
        { type: 'source', position: Position.Right, id: `${id}-optimizedprompt` },
      ]}
    >
      <NodeField label="Optimization Goal">
        <NodeSelect value={prompt} onChange={(e) => setPrompt(e.target.value)}>
          <option value="clarity">Clarity</option>
          <option value="concise">Concise</option>
          <option value="detailed">Detailed</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};