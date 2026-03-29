import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      handles={[
        { 
          type: 'target', 
          position: Position.Left, 
          id: `${id}-value` 
        }
      ]}
    >
      <NodeField label="Name">
        <NodeInput value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};