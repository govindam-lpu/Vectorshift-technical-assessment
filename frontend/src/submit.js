import { motion } from 'framer-motion';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      alert(
        `Pipeline Results:\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      alert('Error connecting to backend. Is it running?');
    }
  };

  return (
    <div className="flex items-center justify-center py-3 bg-[#1a1f2e] border-t border-[#2d3452]">
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-2.5 text-sm font-semibold text-white rounded-lg tracking-wide"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
        }}
      >
        Submit
      </motion.button>
    </div>
  );
};