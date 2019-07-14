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

import { useState, useEffect } from 'react';
import { isFunction } from 'lodash/fp';

import { defaultProps } from './shared';
import * as StepService from './StepService';

function useStateAndHelpers(newProps = {}) {
  // PROPS
  const props = { ...defaultProps, ...newProps };

  if (props.cycle && !props.totalSteps) {
    throw new Error('Cannot use cycle prop without totalSteps prop.');
  }

  if (props.autoPlay && !props.stepDuration) {
    throw new Error('Cannot use autoPlay prop without stepDuration prop.');
  }

  // STATE
  const [steps, setSteps] = useState({
    current: props.initialStep,
    previous: StepService.calculatePreviousStep({
      step: props.initialStep,
      totalSteps: props.totalSteps,
      stepInterval: props.stepInterval,
      cycle: props.cycle
    })
  });
  const [paused, setPaused] = useState(!props.autoPlay);

  // TIMERS
  let playingInterval;
  let animationEndCallback;

  // ACTIONS
  function next() {
    const { totalSteps, cycle, stepInterval, onNext } = props;
    const newStep = StepService.calculateNextStep({
      step: steps.current,
      stepInterval,
      totalSteps,
      cycle
    });

    changeSlide(newStep, () => onNext(getStateAndHelpers()));
  }

  function previous() {
    const { totalSteps, cycle, stepInterval, onPrevious } = props;
    const newStep = StepService.calculatePreviousStep({
      step: steps.current,
      stepInterval,
      totalSteps,
      cycle
    });

    changeSlide(newStep, () => onPrevious(getStateAndHelpers()));
  }

  function pause() {
    const { onPause } = props;

    changePause(true);
    onPause(getStateAndHelpers());
  }

  function play() {
    const { onPlay } = props;

    changePause(false);
    onPlay(getStateAndHelpers());
  }

  // HELPERS
  function shouldPlay() {
    const stepDuration = getDuration(props.stepDuration);

    return stepDuration && !paused;
  }

  function shouldStop() {
    const { totalSteps, cycle } = props;
    const isLastStep = steps.current === totalSteps - 1;
    const stepDuration = getDuration(props.stepDuration);

    return stepDuration && !cycle && isLastStep;
  }

  function getDuration(duration) {
    return isFunction(duration) ? duration(steps.current) : duration;
  }

  function startPlaying() {
    if (!playingInterval) {
      playingInterval = setInterval(next, getDuration(props.stepDuration));
    }
  }

  function stopPlaying() {
    if (playingInterval) {
      playingInterval = clearInterval(playingInterval);
    }
  }

  function changeSlide(newStep, onEndCallback) {
    const animationDuration = getDuration(props.animationDuration);

    const update = () => {
      stopPlaying();
      setSteps({ current: newStep, previous: steps.current });
      onEndCallback();
    };

    if (animationDuration) {
      animationEndCallback = setTimeout(update, animationDuration);
    } else {
      update();
    }
  }

  function changePause(isPaused) {
    const stepDuration = getDuration(props.stepDuration);

    if (!stepDuration) {
      return;
    }

    setPaused(isPaused);

    if (isPaused) {
      stopPlaying();
    } else {
      startPlaying();
    }
  }

  function getStateAndHelpers() {
    const actions = { next, previous, play, pause };
    const propGetters = StepService.generatePropGetters(actions);

    return {
      paused,
      step: steps.current,
      previousStep: steps.previous,
      ...actions,
      ...propGetters
    };
  }

  useEffect(() => {
    clearTimeout(animationEndCallback);

    const playable = shouldPlay();
    const finished = shouldStop();

    if (playable && !finished) {
      startPlaying();
    }

    return function cleanup() {
      stopPlaying();
    };
  });

  return getStateAndHelpers();
}

export default useStateAndHelpers;
