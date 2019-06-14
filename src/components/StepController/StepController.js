import { Component } from 'react';
import PropTypes from 'prop-types';

// import * as StepService from './StepService';

const NOOP = () => {};

function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args));
}

class StepController extends Component {
  constructor(props) {
    super(props);

    if (props.cycle && !props.total) {
      throw new Error('Cannot use cycle prop without total prop.');
    }

    if (props.autoPlay && !props.stepDuration) {
      throw new Error('Cannot use autoPlay prop without stepDuration prop.');
    }

    this.state = {
      step: props.defaultStep,
      paused: !props.autoPlay
    };
  }

  componentDidMount() {
    const { paused } = this.state;
    const { stepDuration } = this.props;

    if (stepDuration && !paused) {
      this.startPlaying();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { paused, step } = this.state;
    const { cycle, total, stepDuration } = this.props;
    const isLastStep = step === total - 1;
    const ended = !cycle && stepDuration && isLastStep;
    const started = stepDuration && !paused && prevState.paused;

    if (paused || ended) {
      this.stopPlaying();
    } else if (started) {
      this.startPlaying();
    }
  }

  componentWillUnmount() {
    if (this.stepInterval) {
      this.stopPlaying();
    }
  }

  setStep(step) {
    this.props.onBeforeChange(this.getStateAndHelpers());

    const { animationDuration, stepDuration } = this.props;
    const update = () => {
      this.stopPlaying();
      this.setState({ step }, () => {
        this.animationEndCallback = undefined;

        if (!this.stepInterval && stepDuration && !this.state.paused) {
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
    if (!this.props.stepDuration) {
      return;
    }

    this.setState({ paused });
  }

  startPlaying() {
    this.stepInterval = setInterval(this.next, this.props.stepDuration);
  }

  stopPlaying() {
    this.stepInterval = clearInterval(this.stepInterval);
  }

  getNextStep(step = this.state.step) {
    const { total, cycle, stepPeriod } = this.props;
    const nextStep = step + stepPeriod;
    const lastStep = total - 1;
    const isOutOfRange = nextStep > lastStep;

    if (total) {
      if (cycle && isOutOfRange) {
        return 0;
      }

      if (isOutOfRange) {
        return lastStep;
      }
    }

    return nextStep;
  }

  getPreviousStep(step = this.state.step) {
    const { total, cycle, stepPeriod } = this.props;
    const previousStep = step - stepPeriod;
    const firstStep = 0;
    const lastStep = total - 1;
    const isOutOfRange = previousStep < firstStep;

    if (total) {
      if (cycle && isOutOfRange) {
        return lastStep;
      }

      if (isOutOfRange) {
        return firstStep;
      }
    }

    return previousStep;
  }

  next = () => {
    const nextStep = this.getNextStep();

    this.props.onNext(nextStep, this.getStateAndHelpers());
    this.setStep(nextStep);
  };

  previous = () => {
    const previousStep = this.getPreviousStep();

    this.props.onPrevious(previousStep, this.getStateAndHelpers());
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

  getPreviousControlProps = (props = {}) => ({
    'aria-label': 'previous',
    ...props,
    onClick: callAll(props.onClick, this.previous)
  });

  getNextControlProps = (props = {}) => ({
    'aria-label': 'next',
    ...props,
    onClick: callAll(props.onClick, this.next)
  });

  getPauseControlProps = (props = {}) => ({
    'aria-label': 'pause',
    ...props,
    onClick: callAll(props.onClick, this.pause)
  });

  getPlayControlProps = (props = {}) => ({
    'aria-label': 'play',
    ...props,
    onClick: callAll(props.onClick, this.play)
  });

  getStateAndHelpers() {
    return {
      // state
      step: this.state.step,
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

  render() {
    const { children } = this.props;

    return children(this.getStateAndHelpers());
  }
}

StepController.defaultProps = {
  total: 0,
  defaultStep: 0,
  autoPlay: false,
  animationSpeed: 0,
  stepDuration: 0,
  stepPeriod: 1,

  onBeforeChange: NOOP,
  onAfterChange: NOOP,

  onPlay: NOOP,
  onPause: NOOP,
  onNext: NOOP,
  onPrevious: NOOP
};

StepController.propTypes = {
  total: PropTypes.number,
  defaultStep: PropTypes.number,
  autoPlay: PropTypes.bool,
  cycle: PropTypes.bool,
  stepPeriod: PropTypes.number,
  stepDuration: PropTypes.number,
  animationDuration: PropTypes.number,

  onBeforeChange: PropTypes.func,
  onAfterChange: PropTypes.func,

  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,

  children: PropTypes.func
};

export default StepController;
