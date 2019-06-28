import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs/react';
import { css } from 'react-emotion';

import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import withTests from '../../../../util/withTests';

import Progress from './Progress';
import { SLIDE_DURATION } from '../../constants';

storiesOf(`${GROUPS.COMPONENTS}|Carousel/Progress`, module)
  .addDecorator(withTests('Carousel/Progress'))
  .add('Progress', () => (
    <div style={{ width: '60vw' }}>
      <Progress
        css={css`
          &:after {
            animation-iteration-count: infinite;
          }
        `}
        paused={boolean('Paused', false)}
        animationDuration={number('Animation duration', SLIDE_DURATION)}
      />
    </div>
  ));
