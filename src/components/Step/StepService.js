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
