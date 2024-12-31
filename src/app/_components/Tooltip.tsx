import type { TooltipRenderProps } from 'react-joyride';

const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  primaryProps,
  skipProps,
}: TooltipRenderProps) => {
  return (
    <div
      style={{
        background: 'white',
        width: 300,
        height: 100,
      }}
    >
      {step.content}
      <div
        style={{
          display: 'flex',
          gap: 16,
        }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          {...skipProps}
        >
          skip
        </button>
        {index > 0 && <button {...backProps}>prev</button>}
        {continuous && <button {...primaryProps}>next</button>}
      </div>
    </div>
  );
};

export default Tooltip;
