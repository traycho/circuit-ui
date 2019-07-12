/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function calculateNextStep(opts = {}) {
  const { step, stepInterval = 1, firstStep = 0, totalSteps, cycle } = opts;
  const lastStep = totalSteps - 1;
  const nextStep = (step || firstStep) + stepInterval;
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

export function calculatePreviousStep(opts = {}) {
  const { step, stepInterval = 1, firstStep = 0, totalSteps, cycle } = opts;
  const previousStep = (step || firstStep) - stepInterval;
  const lastStep = totalSteps - 1;
  const isOutOfRange = previousStep < firstStep;

  if (totalSteps && cycle && isOutOfRange) {
    return lastStep;
  }

  if (isOutOfRange) {
    return firstStep;
  }

  return previousStep;
}

export function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args));
}
