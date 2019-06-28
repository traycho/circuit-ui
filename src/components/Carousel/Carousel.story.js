import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { object, number, boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';

import Container from './components/Container';
import Slides from './components/Slides';
import Slide from './components/Slide';
import SlideImage from './components/SlideImage';
import Controls from './components/Controls';
import Buttons from './components/Buttons';
import Status from './components/Status';
import Carousel from './Carousel';
import { ASPECT_RATIO, ANIMATION_DURATION, SLIDE_DURATION } from './constants';

import { SLIDES } from './__fixtures__';

const { ButtonList, NextButton, PrevButton } = Buttons;

// eslint-disable-next-line react/prop-types
const CustomCarousel = ({ slides }) => {
  const total = slides.length;
  const [step, setStep] = useState(0);
  const goBack = () => setStep(step === 0 ? total - 1 : step - 1);
  const goForward = () => setStep(step === total - 1 ? 0 : step + 1);

  return (
    <Container>
      <Slides>
        {slides.map(({ image }, index) => (
          <Slide
            key={index}
            index={index}
            step={step}
            style={{
              opacity: step === index ? 1 : 0,
              transition: 'opacity .3s ease-in'
            }}
          >
            <SlideImage
              src={image.src}
              alt={image.alt}
              aspectRatio={number('Aspect ratio', 2.5)}
            />
          </Slide>
        ))}
      </Slides>
      <Controls>
        <ButtonList>
          <PrevButton onClick={goBack} />
          <Status style={{ marginLeft: 8 }} step={step} total={total} />
          <NextButton onClick={goForward} />
        </ButtonList>
      </Controls>
    </Container>
  );
};

storiesOf(`${GROUPS.COMPONENTS}|Carousel`, module)
  .addDecorator(withTests('Carousel'))
  .add('Carousel: Stateful', () => (
    <div style={{ width: '60vw' }}>
      <Carousel
        slides={object('Slides', SLIDES)}
        slideDuration={number('Slide duration', SLIDE_DURATION)}
        animationDuration={number('Animation duration', ANIMATION_DURATION)}
        aspectRatio={number('Aspect ratio', ASPECT_RATIO)}
        cycle={boolean('Cycle', true)}
        swipe={boolean('Swipe', true)}
        autoPlay={boolean('Auto play', true)}
        pauseOnHover={boolean('Pause on hover', true)}
      />
    </div>
  ))
  .add('Carousel: Composed', () => (
    <div style={{ width: '60vw' }}>
      <CustomCarousel slides={object('Slides', SLIDES)} />
    </div>
  ));
