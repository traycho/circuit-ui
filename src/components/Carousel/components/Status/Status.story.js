import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import withTests from '../../../../util/withTests';

import Status from './Status';

storiesOf(`${GROUPS.COMPONENTS}|Carousel/Status`, module)
  .addDecorator(withTests('Carousel/Status'))
  .add('Status', () => (
    <Status
      step={number('Current index', 0)}
      total={number('Total slides', 3)}
    />
  ));
