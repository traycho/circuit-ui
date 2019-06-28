import React from 'react';

import Slide from './Slide';
import { SLIDE_DIRECTIONS } from '../../constants';

describe('Slide', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Slide />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with forward animation styles', () => {
      const actual = create(
        <Slide
          index={0}
          step={0}
          slideSize={{ width: 800 }}
          slideDirection={SLIDE_DIRECTIONS.FORWARD}
        />
      );

      expect(actual).toMatchSnapshot();
    });

    it('should render with backward animation styles', () => {
      const actual = create(
        <Slide
          index={0}
          prevStep={0}
          slideSize={{ width: 800 }}
          slideDirection={SLIDE_DIRECTIONS.BACK}
        />
      );

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Slide />);
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
