import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, NodeInput } from './baseNode';

export const ConditionalNode = ({ id }) => {
  const [condition, setCondition] = useState('');

  return (
    <BaseNode
      title="Conditional"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%' } },
      ]}
    >
      <NodeField label="Condition">
        <NodeInput
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. score > 0.5"
        />
      </NodeField>
    </BaseNode>
  );
};