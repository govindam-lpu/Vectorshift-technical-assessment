import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, NodeSelect } from './baseNode';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('+');

  return (
    <BaseNode
      title="Math Operation"
      handles={[
        { 
          type: 'target', 
          position: Position.Left, 
          id: `${id}-number1`, 
          style: { top: '33%' } 
        },
        { 
          type: 'target', 
          position: Position.Left, 
          id: `${id}-number2`, 
          style: { top: '66%' } 
        },
        { 
          type: 'source', 
          position: Position.Right, 
          id: `${id}-result` 
        },
      ]}
    >
      <NodeField label="Operation">
        <NodeSelect value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};