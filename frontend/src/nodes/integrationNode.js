import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const IntegrationNode = ({ id }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  return (
    <BaseNode
      title="Webhook/API Integration"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-data` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <NodeField label="URL">
        <NodeInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </NodeField>
      <NodeField label="Method">
        <NodeSelect value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};