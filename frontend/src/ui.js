import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { MathNode } from './nodes/mathNode';
import { IntegrationNode } from './nodes/integrationNode';
import { PromptNode } from './nodes/promptOptimizerNode';
import { ParseNode } from './nodes/parseNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  conditional: ConditionalNode,
  math: MathNode,
  integration: IntegrationNode,
  promptOptimizer: PromptNode,
  parseNode: ParseNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

// minimap node colors matching accent system
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

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
        if (typeof type === 'undefined' || !type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="flex-1 w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        deleteKeyCode='Delete'
        style={{ height: '100%', width: '100%' }}
      >
        <Background color="#2d3452" gap={gridSize} variant="dots" />
        <Controls className="!bottom-4 !left-4" />
        <MiniMap
          nodeColor={(node) => nodeColors[node.type] || '#6366f1'}
          maskColor="rgba(15, 17, 23, 0.7)"
          style={{
            background: '#1a1f2e',
            border: '1px solid #2d3452',
            borderRadius: '12px',
          }}
        />
      </ReactFlow>
    </div>
  );
};