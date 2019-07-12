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

/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';

import Image from '../Image';
import Button from '../Button';
import Step from './Step';

const SLIDE_WIDTH = 400;
const SLIDE_DURATION = 2000;
const ANIMATION_DURATION = 300;
const IMAGES = [
  'https://placedog.net/700/700',
  'https://placedog.net/800/800',
  'https://placedog.net/900/900'
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

const sliderImageStyles = ({ theme }) => css`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${SLIDE_WIDTH}px;
  width: 100%;
  height: 100%;
  transition: all ${ANIMATION_DURATION}ms ease-in-out;
  padding: ${theme.spacings.giga};
`;
const SliderImage = styled(Image)(sliderImageStyles);

const buttonStyles = ({ theme }) => css`
  margin: ${theme.spacings.byte};
`;
const SliderButton = styled(Button)(buttonStyles);

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
          <SliderButton {...getPreviousControlProps()}>Previous</SliderButton>
          <SliderButton {...getNextControlProps()}>Next</SliderButton>
          <SliderButton
            {...(paused ? getPlayControlProps() : getPauseControlProps())}
          >
            {paused ? 'Play' : 'Pause'}
          </SliderButton>
        </SliderControls>
      </SliderWrapper>
    )}
  </Step>
);

storiesOf(`${GROUPS.COMPONENTS}|Step`, module)
  .addDecorator(withTests('Step'))
  .add('Slider', () => <Slider images={object('images', IMAGES)} />);
