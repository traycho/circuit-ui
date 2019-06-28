import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';

import { SLIDE_DURATION } from '../../constants';

const progressAnimation = keyframes`
  0% {
    width: 0%;
    transform: translateX(0%);
  }

  90% {
    width: 100%;
    transform: translateX(0%);
  }

  100% {
    width: 100%;
    transform: translateX(102%);
  }
`;
const progressStyles = ({ theme, paused, animationDuration }) => css`
  label: carousel__progress;
  width: 100%;
  height: 2px;
  overflow: hidden;
  background-color: ${theme.colors.n200};
  border-radius: ${theme.borderRadius.giga};

  &:after {
    content: '';
    display: block;
    background-color: ${theme.colors.black};
    animation-name: ${progressAnimation};
    animation-duration: ${animationDuration}ms;
    animation-play-state: ${paused ? 'paused' : 'running'};
    animation-fill-mode: forwards;
    height: 100%;
  }
`;
const Progress = styled('div')(progressStyles);

Progress.propTypes = {
  paused: PropTypes.bool,
  animationDuration: PropTypes.number,
  slideDuration: PropTypes.number
};

Progress.defaultProps = {
  /**
   * Indicates if progress animation is currently paused
   */
  paused: false,
  /**
   * Duration of progress animation in milliseconds
   */
  animationDuration: SLIDE_DURATION
};

export default Progress;
