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

import { Component } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash/fp';

import * as StepService from './StepService';

class Step extends Component {
  constructor(props) {
    super(props);

    if (props.cycle && !props.totalSteps) {
      throw new Error('Cannot use cycle prop without totalSteps prop.');
    }

    if (props.autoPlay && !props.stepDuration) {
      throw new Error('Cannot use autoPlay prop without stepDuration prop.');
    }

    this.state = {
      step: props.initialStep,
      previousStep: StepService.calculatePreviousStep({
        step: props.initialStep,
        totalSteps: props.totalSteps,
        stepInterval: props.stepInterval,
        cycle: props.cycle
      }),
      paused: !props.autoPlay
    };
  }

  componentDidMount() {
    const shouldPlay = this.shouldPlay();

    if (shouldPlay) {
      this.startPlaying();
    }
  }

  componentWillUnmount() {
    this.stopPlaying();
  }

  startPlaying() {
    if (!this.interval) {
      this.interval = setInterval(this.next, this.getDurationProp('step'));
    }
  }

  stopPlaying() {
    if (this.interval) {
      this.interval = clearInterval(this.interval);
    }
  }

  setStep(newStep) {
    const { step } = this.state;
    const animationDuration = this.getDurationProp('animation');

    return new Promise(resolve => {
      const update = () => {
        this.stopPlaying();
        this.setState({ step: newStep, previousStep: step }, () => {
          const shouldPlay = this.shouldPlay();
          const shouldStop = this.shouldStop();

          this.animationEndCallback = clearTimeout(this.animationEndCallback);

          if (shouldPlay && !shouldStop) {
            this.startPlaying();
          }

          resolve();
        });
      };

      if (animationDuration) {
        this.animationEndCallback = setTimeout(update, animationDuration);
      } else {
        update();
      }
    });
  }

  setPause(paused) {
    const stepDuration = this.getDurationProp('step');

    if (!stepDuration) {
      return;
    }

    this.setState({ paused });

    if (paused) {
      this.stopPlaying();
    } else {
      this.startPlaying();
    }
  }

  shouldPlay() {
    const { paused } = this.state;
    const stepDuration = this.getDurationProp('step');

    return stepDuration && !paused;
  }

  shouldStop() {
    const { step } = this.state;
    const { totalSteps, cycle } = this.props;
    const isLastStep = step === totalSteps - 1;
    const stepDuration = this.getDurationProp('step');

    return stepDuration && !cycle && isLastStep;
  }

  getDurationProp(prefix = 'step') {
    const propKey = `${prefix}Duration`;
    const duration = this.props[propKey];

    return isFunction(duration) ? duration(this.state.step) : duration;
  }

  getStateAndHelpers() {
    return {
      ...this.state,

      // prop getters
      getStepProps: this.getStepProps,
      getNextControlProps: this.getNextControlProps,
      getPreviousControlProps: this.getPreviousControlProps,
      getPauseControlProps: this.getPauseControlProps,
      getPlayControlProps: this.getPlayControlProps,

      // actions
      next: this.next,
      previous: this.previous,
      pause: this.pause,
      play: this.play
    };
  }

  getStepProps = (props = {}) => ({
    ...props
  });

  getPreviousControlProps = (props = {}) => ({
    'aria-label': 'previous',
    ...props,
    onClick: StepService.callAll(props.onClick, this.previous)
  });

  getNextControlProps = (props = {}) => ({
    'aria-label': 'next',
    ...props,
    onClick: StepService.callAll(props.onClick, this.next)
  });

  getPauseControlProps = (props = {}) => ({
    'aria-label': 'pause',
    ...props,
    onClick: StepService.callAll(props.onClick, this.pause)
  });

  getPlayControlProps = (props = {}) => ({
    'aria-label': 'play',
    ...props,
    onClick: StepService.callAll(props.onClick, this.play)
  });

  next = () => {
    const { step } = this.state;
    const { totalSteps, cycle, stepInterval, onNext } = this.props;
    const newStep = StepService.calculateNextStep({
      step,
      stepInterval,
      totalSteps,
      cycle
    });

    this.setStep(newStep).then(() =>
      onNext(newStep, this.getStateAndHelpers())
    );
  };

  previous = () => {
    const { step } = this.state;
    const { totalSteps, cycle, stepInterval, onPrevious } = this.props;
    const newStep = StepService.calculatePreviousStep({
      step,
      stepInterval,
      totalSteps,
      cycle
    });

    this.setStep(newStep).then(() =>
      onPrevious(newStep, this.getStateAndHelpers())
    );
  };

  pause = () => {
    const { onPause } = this.props;

    this.setPause(true);
    onPause(this.getStateAndHelpers());
  };

  play = () => {
    const { onPlay } = this.props;

    this.setPause(false);
    onPlay(this.getStateAndHelpers());
  };

  render() {
    const { children } = this.props;

    return children(this.getStateAndHelpers());
  }
}

Step.defaultProps = {
  totalSteps: 0,
  initialStep: 0,
  autoPlay: false,
  cycle: false,
  stepInterval: 1,
  animationDuration: 0,
  stepDuration: 0,
  onPlay: () => {},
  onPause: () => {},
  onNext: () => {},
  onPrevious: () => {}
};

Step.propTypes = {
  totalSteps: PropTypes.number,
  initialStep: PropTypes.number,
  autoPlay: PropTypes.bool,
  cycle: PropTypes.bool,
  stepInterval: PropTypes.number,
  stepDuration: PropTypes.oneOfType(PropTypes.number, PropTypes.func),
  animationDuration: PropTypes.oneOfType(PropTypes.number, PropTypes.func),
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  children: PropTypes.func
};

export default Step;
