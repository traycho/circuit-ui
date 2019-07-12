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

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { isEmpty, isFunction } from 'lodash/fp';
import {
  childrenPropType,
  childrenRenderPropType
} from '../../util/shared-prop-types';

import useComponentSize from './hooks/use-component-size';
import Container from './components/Container';
import Slides from './components/Slides';
import Slide from './components/Slide';
import SlideImage from './components/SlideImage';
import Controls from './components/Controls';
import Status from './components/Status';
import Progress from './components/Progress';
import Buttons from './components/Buttons';
import Step from '../Step';

import {
  ASPECT_RATIO,
  ANIMATION_DURATION,
  SLIDE_DURATION,
  SLIDE_DIRECTIONS
} from './constants';

const { ButtonList, NextButton, PrevButton, PlayButton } = Buttons;

const statusAlignment = ({ theme }) => css`
  flex: none;
  margin-right: ${theme.spacings.exa};

  ${theme.mq.untilKilo} {
    margin-right: ${theme.spacings.kilo};
  }
`;
const StyledStatus = styled(Status)(statusAlignment);

const progressAlignment = css`
  flex: 1 1 auto;
`;
const StyledProgress = styled(Progress)(progressAlignment);

const buttonsAlignment = ({ theme }) => css`
  margin-left: ${theme.spacings.exa};

  ${theme.mq.untilKilo} {
    margin-left: ${theme.spacings.kilo};
  }
`;
const StyledButtonList = styled(ButtonList)(buttonsAlignment);

const Carousel = ({
  slides,
  slideDuration,
  animationDuration,
  aspectRatio,
  children,
  cycle,
  swipe,
  autoPlay,
  pauseOnHover,
  hideControls,
  ariaLabelledbyPrefix,
  ...props
}) => {
  const slidesTotal = slides.length;
  const slidesRef = useRef(null);
  const slideSize = useComponentSize(slidesRef);
  const [slideDirection, setSlideDirection] = useState();

  if (isEmpty(slides)) {
    return null;
  }

  const goToNextSlide = () => setSlideDirection(SLIDE_DIRECTIONS.FORWARD);
  const goToPreviousSlide = () => setSlideDirection(SLIDE_DIRECTIONS.BACK);

  return (
    <Step
      cycle={cycle}
      swipe={swipe}
      autoPlay={autoPlay}
      pauseOnHover={pauseOnHover}
      totalSteps={slidesTotal}
      stepDuration={slideDuration}
      animationDuration={animationDuration}
      onNext={goToNextSlide}
      onPrevious={goToPreviousSlide}
    >
      {({
        step,
        previousStep,
        paused,
        play,
        pause,
        getStepProps,
        getNextControlProps,
        getPreviousControlProps,
        getPlayControlProps,
        getPauseControlProps
      }) => (
        <Container aria-label="gallery" {...props}>
          <Slides ref={slidesRef} {...getStepProps()}>
            {slides.map(({ image }, index) => (
              <Slide
                key={index}
                index={index}
                step={step}
                prevStep={previousStep}
                slideSize={slideSize}
                slideDirection={slideDirection}
                animationDuration={animationDuration}
              >
                <SlideImage
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={aspectRatio}
                  aria-labelledby={
                    ariaLabelledbyPrefix
                      ? `${ariaLabelledbyPrefix}--${index}`
                      : undefined
                  }
                />
              </Slide>
            ))}
          </Slides>

          {!hideControls && (
            <Controls>
              <StyledStatus step={step} total={slidesTotal} />

              <StyledProgress
                key={step}
                paused={paused}
                animationDuration={slideDuration}
              />

              <StyledButtonList>
                <PlayButton
                  paused={paused}
                  {...(paused ? getPlayControlProps() : getPauseControlProps())}
                />
                <PrevButton {...getPreviousControlProps()} />
                <NextButton {...getNextControlProps()} />
              </StyledButtonList>
            </Controls>
          )}

          {isFunction(children)
            ? children({
                step,
                previousStep,
                paused,
                play,
                pause
              })
            : children}
        </Container>
      )}
    </Step>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object.isRequired
    })
  ),
  /**
   * Indicates duration of animation between slides (in milliseconds).
   */
  animationDuration: PropTypes.number,
  /**
   * Indicated time how long each slide will stay visible (in milliseconds).
   */
  slideDuration: PropTypes.number,
  /**
   * Slide image aspect ratio.
   */
  aspectRatio: PropTypes.number,
  /**
   * Indicates if carousel should start again after last slide.
   */
  cycle: PropTypes.bool,
  /**
   * Make carousel swipeable on mobile.
   */
  swipe: PropTypes.bool,
  /**
   * Make carousel playing immediately after load.
   */
  autoPlay: PropTypes.bool,
  /**
   * Make carousel pausing when hovering a slide.
   */
  pauseOnHover: PropTypes.bool,

  hideControls: PropTypes.bool,
  /**
   * Connects and entitles slide image with caption by adding dynamic aria-labelledby attribute on image.
   */
  ariaLabelledbyPrefix: PropTypes.string,
  /**
   * Add additional components inside a carousel.
   */
  children: PropTypes.oneOfType([childrenPropType, childrenRenderPropType])
};

Carousel.defaultProps = {
  slides: [],
  animationDuration: ANIMATION_DURATION,
  slideDuration: SLIDE_DURATION,
  aspectRatio: ASPECT_RATIO,
  cycle: true,
  swipe: true,
  autoPlay: true,
  pauseOnHover: true
};

export default Carousel;
