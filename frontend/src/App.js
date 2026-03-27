import { Toolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div
  className="flex flex-col h-screen overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, #0f1117 0%, #1a1040 50%, #0f1117 100%)',
  }}
>
      <Toolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;