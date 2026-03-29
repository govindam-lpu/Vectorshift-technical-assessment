import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const ResultModal = ({ data, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.18 }}
        className="bg-[#1a1f2e] border border-[#2d3452] rounded-2xl w-[320px] overflow-hidden"
        style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d3452]">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">Results</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4">
          {[
            { label: 'Nodes', value: data.num_nodes, color: '#6366f1' },
            { label: 'Edges', value: data.num_edges, color: '#8b5cf6' },
            { label: 'Is DAG', value: data.is_dag ? 'Yes' : 'No', color: data.is_dag ? '#10b981' : '#ef4444' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4">
          <p className="text-xs text-slate-400 bg-[#ffffff08] rounded-lg px-3 py-2.5 border border-[#ffffff0a]">
            {data.is_dag
              ? 'No cycles found. Data flows cleanly through this pipeline.'
              : 'A cycle was detected. Check your connections and remove the loop.'}
          </p>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            Got it
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error connecting to backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {result && <ResultModal data={result} onClose={() => setResult(null)} />}
      <div
        className="flex items-center justify-center py-3 border-t border-[#2d3452]"
        style={{ background: 'rgba(26,31,46,0.95)' }}
      >
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-2.5 text-sm font-semibold text-white rounded-lg tracking-wide disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          }}
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </motion.button>
      </div>
    </>
  );
};