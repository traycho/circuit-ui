import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';

import { childrenPropType } from '../../../../util/shared-prop-types';
import * as SlideService from './SlideService';
import { ANIMATION_DURATION, SLIDE_DIRECTIONS } from '../../constants';

const baseStyles = ({ index, stackOrder, width }) => css`
  label: carousel__slide;
  width: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${width};
  transform: translate3d(${-index * 100}%, 0, 0);
  backface-visibility: hidden;
  position: relative;
  z-index: ${stackOrder};
`;
const Wrapper = styled('div')(baseStyles);

const slideIn = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;
const slideOut = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;
const animationStyles = ({
  theme,
  isAnimating,
  animationDuration,
  animationName
}) => css`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  will-change: width;
  ${isAnimating &&
    css`
      animation-name: ${animationName};
      animation-duration: ${animationDuration}ms;
      animation-fill-mode: forwards;
      animation-timing-function: ${theme.transitions.easeInOutCubic};
    `};
`;
const Inner = styled('div')(animationStyles);

const dynamicWidthStyles = ({ width }) => css`
  width: ${width};
`;
const Content = styled('div')(dynamicWidthStyles);

const Slide = ({
  index,
  step,
  prevStep,
  slideSize,
  slideDirection,
  animationDuration,
  children,
  ...props
}) => {
  const stackOrder = SlideService.getStackOrder(
    index,
    step,
    prevStep,
    slideDirection
  );
  const shouldAnimate = SlideService.shouldAnimate(
    index,
    step,
    prevStep,
    slideDirection
  );
  const dynamicWidth = SlideService.getDynamicWidth(slideSize.width);
  const animationName =
    slideDirection === SLIDE_DIRECTIONS.FORWARD ? slideIn : slideOut;

  return (
    <Wrapper
      index={index}
      stackOrder={stackOrder}
      width={dynamicWidth}
      {...props}
    >
      <Inner
        isAnimating={slideSize.width && shouldAnimate}
        animationName={animationName}
        animationDuration={animationDuration}
      >
        <Content width={dynamicWidth}>{children}</Content>
      </Inner>
    </Wrapper>
  );
};

Slide.propTypes = {
  /**
   *  Index of a slide in a carousel (required for animation)
   */
  index: PropTypes.number,
  /**
   * Current active index of a carousel (required for animation)
   */
  step: PropTypes.number,
  /**
   * Previous active index of a carousel (required for animation)
   */
  prevStep: PropTypes.number,
  /**
   * Dimensions of a carousel (width of the slide is required for animation)
   */
  slideSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  /**
   * Indicates slide direction of a carousel (required for animation)
   */
  slideDirection: PropTypes.oneOf([
    SLIDE_DIRECTIONS.FORWARD,
    SLIDE_DIRECTIONS.BACK
  ]),
  /**
   * Duration of animation between slides in milliseconds
   */
  animationDuration: PropTypes.number,
  /**
   * Content of a slide
   */
  children: childrenPropType
};

Slide.defaultProps = {
  index: 0,
  step: 0,
  slideSize: {},
  animationDuration: ANIMATION_DURATION
};

export default Slide;
