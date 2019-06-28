import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import withTests from '../../../../util/withTests';

import { ButtonList, PlayButton, NextButton, PrevButton } from './Buttons';

storiesOf(`${GROUPS.COMPONENTS}|Carousel/Buttons`, module)
  .addDecorator(withTests('Carousel/Buttons'))
  .add('Buttons', () => (
    <ButtonList>
      <PlayButton onClick={action('on play click')} />
      <PlayButton paused onClick={action('on pause click')} />
      <PrevButton onClick={action('on previous click')} />
      <NextButton onClick={action('on next click')} />
    </ButtonList>
  ));
