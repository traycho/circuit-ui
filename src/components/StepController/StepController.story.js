import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from 'react-emotion';
import { action } from '@storybook/addon-actions';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';

import Image from '../Image';
import Button from '../Button';

import StepController from './StepController';

const IMAGES = [
  'https://picsum.photos/800',
  'https://picsum.photos/900',
  'https://picsum.photos/1000'
];
const SLIDE_WIDTH = 350;
const ANIMATION_DURATION = 300;

const carouselWrapperStyles = css`
  margin: 0 auto;
  overflow: hidden;
  width: ${SLIDE_WIDTH}px;
`;
const CarouselWrapper = styled('div')(carouselWrapperStyles);

const carouselInnerStyles = ({ step }) => css`
  display: flex;
  transform: translate3d(${-step * SLIDE_WIDTH}px, 0, 0);
  transition: all ${ANIMATION_DURATION}ms ease-in-out;
`;
const CarouselInner = styled('div')(carouselInnerStyles);

const carouselControlsStyles = css`
  display: flex;
  justify-content: center;
`;
const CarouselControls = styled('div')(carouselControlsStyles);

const slideImageStyles = css`
  width: 100%;
  height: 100%;
  transition: all ${ANIMATION_DURATION}ms ease-in-out;
  padding: 20px;
`;
const SlideImage = styled(Image)(slideImageStyles);

storiesOf(`${GROUPS.COMPONENTS}|StepController`, module)
  .addDecorator(withTests('StepController'))
  .add('Simple carousel', () => (
    <StepController
      cycle
      autoPlay
      total={IMAGES.length}
      stepDuration={1500}
      animationDuration={ANIMATION_DURATION}
      onNext={action('onNext')}
      onPrevious={action('onPrev')}
      onPlay={action('onPlay')}
      onPause={action('onPause')}
      onBeforeChange={action('onBeforeChange')}
      onAfterChange={action('onAfterChange')}
    >
      {({
        step,
        paused,
        getNextControlProps,
        getPreviousControlProps,
        getPauseControlProps,
        getPlayControlProps
      }) => (
        <CarouselWrapper>
          <CarouselInner step={step}>
            {IMAGES.map((image, i) => (
              <SlideImage key={i} src={image} alt="random pic" />
            ))}
          </CarouselInner>
          <CarouselControls>
            <Button {...getPreviousControlProps()}>Previous</Button>
            <Button {...getNextControlProps()}>Next</Button>
            <Button
              {...(paused ? getPlayControlProps() : getPauseControlProps())}
            >
              {paused ? 'Play' : 'Pause'}
            </Button>
          </CarouselControls>
        </CarouselWrapper>
      )}
    </StepController>
  ));
