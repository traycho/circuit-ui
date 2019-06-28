import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'react-emotion';

import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import withTests from '../../../../util/withTests';

import Heading from '../../../Heading';
import Image from '../../../Image';
import Slide from './Slide';

storiesOf(`${GROUPS.COMPONENTS}|Carousel/Slide`, module)
  .addDecorator(withTests('Carousel/Slide'))
  .add('Slide with image', () => (
    <div style={{ width: '60vw' }}>
      <Slide>
        <Image src="http://www.placepuppy.net/800/500" />
      </Slide>
    </div>
  ))
  .add('Slide with text and image', () => (
    <div style={{ width: '60vw' }}>
      <Slide>
        <Image src="http://www.placepuppy.net/800/500" />
        <Heading
          css={css`
            color: #fff;
            width: 50%;
            position: absolute;
            bottom: 0;
            left: 25px;
            z-index: 2;
          `}
        >
          Get The SumUp Card Reader Today!
        </Heading>
      </Slide>
    </div>
  ));
