import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from 'react-emotion';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';

import Image from '../Image';
import Button from '../Button';
import Step from './Step';

const SLIDE_WIDTH = 350;
const SLIDE_DURATION = 1500;
const ANIMATION_DURATION = 300;
const IMAGES = [
  'https://picsum.photos/800',
  'https://picsum.photos/900',
  'https://picsum.photos/1000'
];

const sliderWrapperStyles = css`
  margin: 0 auto;
  overflow: hidden;
  width: ${SLIDE_WIDTH}px;
`;
const SliderWrapper = styled('div')(sliderWrapperStyles);

const sliderInnerStyles = ({ step }) => css`
  display: flex;
  width: 100%;
  transform: translate3d(${-step * SLIDE_WIDTH}px, 0, 0);
  transition: all ${ANIMATION_DURATION}ms ease-in-out;
`;
const SliderInner = styled('div')(sliderInnerStyles);

const sliderControlsStyles = css`
  display: flex;
  justify-content: center;
`;
const SliderControls = styled('div')(sliderControlsStyles);

const sliderImageStyles = css`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${SLIDE_WIDTH}px;
  width: 100%;
  height: 100%;
  transition: all ${ANIMATION_DURATION}ms ease-in-out;
  padding: 20px;
`;
const SliderImage = styled(Image)(sliderImageStyles);

// eslint-disable-next-line react/prop-types
const Slider = ({ images }) => (
  <Step
    cycle
    autoPlay
    totalSteps={images.length}
    stepDuration={SLIDE_DURATION}
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
      <SliderWrapper>
        <SliderInner step={step}>
          {images.map((image, i) => (
            <SliderImage key={i} src={image} alt="random pic" />
          ))}
        </SliderInner>
        <SliderControls>
          <Button {...getPreviousControlProps()}>Previous</Button>
          <Button {...getNextControlProps()}>Next</Button>
          <Button
            {...(paused ? getPlayControlProps() : getPauseControlProps())}
          >
            {paused ? 'Play' : 'Pause'}
          </Button>
        </SliderControls>
      </SliderWrapper>
    )}
  </Step>
);

storiesOf(`${GROUPS.COMPONENTS}|Step`, module)
  .addDecorator(withTests('Step'))
  .add('Slider', () => <Slider images={object('images', IMAGES)} />);
