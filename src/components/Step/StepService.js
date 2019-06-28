export function calculateNextStep({
  step = 0,
  stepInterval = 1,
  totalSteps,
  cycle
}) {
  const firstStep = 0;
  const lastStep = totalSteps - 1;
  const nextStep = step + stepInterval;
  const isOutOfRange = nextStep > lastStep;

  if (totalSteps) {
    if (cycle && isOutOfRange) {
      return firstStep;
    }

    if (isOutOfRange) {
      return lastStep;
    }
  }

  return nextStep;
}

export function calculatePreviousStep({
  step = 0,
  stepInterval = 1,
  totalSteps,
  cycle
}) {
  const previousStep = step - stepInterval;
  const firstStep = 0;
  const lastStep = totalSteps - 1;
  const isOutOfRange = previousStep < firstStep;

  if (totalSteps) {
    if (cycle && isOutOfRange) {
      return lastStep;
    }

    if (isOutOfRange) {
      return firstStep;
    }
  }

  return previousStep;
}

export function callFns(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args));
}
