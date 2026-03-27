import { motion } from 'framer-motion';

export const DraggableNode = ({ type, label, color = '#6366f1' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-grab select-none text-xs font-medium whitespace-nowrap"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color: color,
      }}
      onDragStart={(event) => onDragStart(event, type)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      draggable
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </motion.div>
  );
};