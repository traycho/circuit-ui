import { Component } from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '../../util/type-check';
import * as StepService from './StepService';

class StepController extends Component {
  constructor(props) {
    super(props);

    if (props.cycle && !props.totalSteps) {
      throw new Error('Cannot use cycle prop without totalSteps prop.');
    }

    if (props.autoPlay && !props.stepDuration) {
      throw new Error('Cannot use autoPlay prop without stepDuration prop.');
    }

    this.state = {
      step: props.defaultStep,
      previousStep: StepService.calculatePreviousStep(props.defaultStep),
      paused: !props.autoPlay
    };
  }

  componentDidMount() {
    const { paused } = this.state;
    const stepDuration = this.getDuration('step');

    if (stepDuration && !paused) {
      this.startPlaying();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { paused, step } = this.state;
    const { cycle, totalSteps } = this.props;
    const stepDuration = this.getDuration('step');
    const isLastStep = step === totalSteps - 1;
    const ended = stepDuration && !cycle && isLastStep;
    const started = stepDuration && !paused && prevState.paused;

    if (paused || ended) {
      this.stopPlaying();
    } else if (started) {
      this.startPlaying();
    }
  }

  componentWillUnmount() {
    this.stopPlaying();
  }

  startPlaying() {
    if (!this.interval) {
      this.interval = setInterval(this.next, this.getDuration('step'));
    }
  }

  stopPlaying() {
    if (this.interval) {
      this.interval = clearInterval(this.interval);
    }
  }

  setStep(newStep) {
    const { step, paused } = this.state;
    const stepDuration = this.getDuration('step');
    const animationDuration = this.getDuration('animation');
    const update = () => {
      this.props.onBeforeChange(this.getStateAndHelpers());

      this.stopPlaying();
      this.setState({ step: newStep, previousStep: step }, () => {
        clearTimeout(this.animationEndCallback);

        if (stepDuration && !paused) {
          this.startPlaying();
        }

        this.props.onAfterChange(this.getStateAndHelpers());
      });
    };

    if (animationDuration) {
      this.animationEndCallback = setTimeout(update, animationDuration);
    } else {
      update();
    }
  }

  setPause(paused) {
    const stepDuration = this.getDuration('step');

    if (!stepDuration) {
      return;
    }

    this.setState({ paused });
  }

  getDuration(prefix = 'step') {
    const propKey = `${prefix}Duration`;
    const duration = this.props[propKey];

    return isFunction(duration) ? duration(this.state.step) : duration;
  }

  getPreviousControlProps = (props = {}) => ({
    'aria-label': 'previous',
    ...props,
    onClick: StepService.callFns(props.onClick, this.previous)
  });

  getNextControlProps = (props = {}) => ({
    'aria-label': 'next',
    ...props,
    onClick: StepService.callFns(props.onClick, this.next)
  });

  getPauseControlProps = (props = {}) => ({
    'aria-label': 'pause',
    ...props,
    onClick: StepService.callFns(props.onClick, this.pause)
  });

  getPlayControlProps = (props = {}) => ({
    'aria-label': 'play',
    ...props,
    onClick: StepService.callFns(props.onClick, this.play)
  });

  getStateAndHelpers() {
    return {
      // state
      step: this.state.step,
      previousStep: this.state.previousStep,
      paused: this.state.paused,

      // prop getters
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

  next = () => {
    const { step } = this.state;
    const { totalSteps, cycle, stepInterval, onNext } = this.props;
    const nextStep = StepService.calculateNextStep({
      step,
      stepInterval,
      totalSteps,
      cycle
    });

    onNext(nextStep, this.getStateAndHelpers());
    this.setStep(nextStep);
  };

  previous = () => {
    const { step } = this.state;
    const { totalSteps, cycle, stepInterval, onPrevious } = this.props;
    const previousStep = StepService.calculatePreviousStep({
      step,
      stepInterval,
      totalSteps,
      cycle
    });

    onPrevious(previousStep, this.getStateAndHelpers());
    this.setStep(previousStep);
  };

  pause = () => {
    this.setPause(true);
    this.props.onPause(this.getStateAndHelpers());
  };

  play = () => {
    this.setPause(false);
    this.props.onPlay(this.getStateAndHelpers());
  };

  render() {
    const { children } = this.props;

    return children(this.getStateAndHelpers());
  }
}

StepController.defaultProps = {
  totalSteps: 0,
  defaultStep: 0,
  autoPlay: false,
  animationSpeed: 0,
  stepDuration: 0,
  stepInterval: 1,
  onBeforeChange: () => {},
  onAfterChange: () => {},
  onPlay: () => {},
  onPause: () => {},
  onNext: () => {},
  onPrevious: () => {}
};

StepController.propTypes = {
  totalSteps: PropTypes.number,
  defaultStep: PropTypes.number,
  autoPlay: PropTypes.bool,
  cycle: PropTypes.bool,
  stepInterval: PropTypes.number,
  stepDuration: PropTypes.oneOfType(PropTypes.number, PropTypes.func),
  animationDuration: PropTypes.oneOfType(PropTypes.number, PropTypes.func),
  onBeforeChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,

  children: PropTypes.func
};

export default StepController;
