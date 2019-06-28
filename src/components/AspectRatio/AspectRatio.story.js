import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs/react';
import styled from 'react-emotion';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import AspectRatio from './AspectRatio';

const Background = styled('div')`
  background: lightgrey;
`;

storiesOf(`${GROUPS.COMPONENTS}|AspectRatio`, module).add('AspectRatio', () => (
  <div style={{ width: '50vw' }}>
    <AspectRatio aspectRatio={number('Aspect ratio', 1.5)}>
      <Background />
    </AspectRatio>
  </div>
));
