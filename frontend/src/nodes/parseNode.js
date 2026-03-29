import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, NodeInput } from './baseNode';

export const ParseNode = ({ id }) => {
  const [key, setKey] = useState('');

  return (
    <BaseNode
      title="Parse JSON Data"
      handles={[
        { 
          type: 'target', 
          position: Position.Left, 
          id: `${id}-json` 
        },
        { 
          type: 'source', 
          position: Position.Right, 
          id: `${id}-parsed` 
        },
      ]}
    >
      <NodeField label="Key to Extract">
        <NodeInput
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="e.g. data.results"
        />
      </NodeField>
    </BaseNode>
  );
};