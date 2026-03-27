import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField } from './baseNode';

export const TextNode = ({ id, data }) => {
  const initialText = data?.text || '{{input}}';
  const [currText, setCurrText] = useState(initialText);
  const [variables, setVariables] = useState(
    [...initialText.matchAll(/\{\{(\w+)\}\}/g)].map(match => match[1])
  );
  const [size, setSize] = useState({ width: 200, height: 80 });

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    const matches = [...newText.matchAll(/\{\{(\w+)\}\}/g)];
    setVariables(matches.map(match => match[1]));
    const newWidth = Math.max(200, Math.min(500, newText.length * 8));
    const newHeight = Math.max(80, newText.split('\n').length * 40);
    setSize({ width: newWidth, height: newHeight });
  };

  const dynamicHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` }
  }));

  return (
    <BaseNode title="Text" handles={dynamicHandles} style={{ width: size.width }}>
      <NodeField label="Text">
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="w-full px-2 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all resize-none"
          style={{ height: size.height }}
        />
      </NodeField>
    </BaseNode>
  );
};