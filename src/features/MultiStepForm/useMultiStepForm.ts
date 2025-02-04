import * as React from 'react';

export function useMultiStepForm(steps: React.ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

	const nextStep = () =>
		setCurrentStepIndex((prev) => {
			if (prev >= steps.length - 1) {
				return prev;
			}
			return prev + 1;
		});

	const previousStep = () =>
		setCurrentStepIndex((prev) => {
			if (prev <= 0) {
				return prev;
			}
			return prev - 1;
		});

	const goToStep = (stepIndex: number) => setCurrentStepIndex(stepIndex);

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		nextStep,
		previousStep,
		goToStep,
	};
}
