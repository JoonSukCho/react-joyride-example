'use client';

import { useEffect, useState } from 'react';
import { ACTIONS, CallBackProps, Joyride, STATUS, Step } from 'react-joyride';
import Overlay from './_components/Overlay';
import Tooltip from './_components/Tooltip';

export default function Home() {
  const [run, setRun] = useState(false);
  const [steps] = useState<Step[]>([
    {
      content: 'Step 1',
      placement: 'top',
      target: '#step1',
      disableBeacon: true,
    },
    {
      content: 'Step 2',
      placement: 'top',
      target: '#step2',
      disableBeacon: true,
    },
    {
      content: 'Step 3',
      placement: 'top',
      target: '#step3',
      disableBeacon: true,
    },
  ]);
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (type === 'step:after') {
      if (action === ACTIONS.NEXT) {
        setStepIndex((prev) => prev + 1);
      }

      if (action === ACTIONS.PREV) {
        setStepIndex((prev) => prev - 1);
      }
    }

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  useEffect(() => {
    setRun(true);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {run && <Overlay />}
      <Joyride
        key="tour"
        callback={handleJoyrideCallback}
        continuous
        run={run}
        stepIndex={stepIndex}
        steps={steps}
        disableScrolling
        disableCloseOnEsc
        scrollToFirstStep
        showProgress={false}
        showSkipButton
        tooltipComponent={Tooltip}
        disableOverlayClose
        hideBackButton={false}
        spotlightClicks={false}
        disableOverlay
        debug
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      <section className="flex flex-col items-center gap-8">
        <div
          id="step1"
          className="star-burst w-20 h-20 bg-blue-500 rounded-full"
        >
          <h1>Step 1</h1>
        </div>
        <div
          id="step2"
          className="star-burst w-20 h-20 bg-blue-500 rounded-full"
        >
          <h1>Step 2</h1>
        </div>
        <div
          id="step3"
          className="star-burst w-20 h-20 bg-blue-500 rounded-full"
        >
          <h1>Step 3</h1>
        </div>
      </section>
    </div>
  );
}
