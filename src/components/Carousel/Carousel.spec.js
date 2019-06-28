import React from 'react';

import Carousel from './Carousel';
import { SLIDES } from './__fixtures__';

// enable when migrated to React 16.8
describe.skip('Carousel', () => {
  describe('styles', () => {
    it('should not render without slides data', () => {
      const actual = create(<Carousel />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles', () => {
      const actual = create(<Carousel slides={SLIDES} />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with children as a function', () => {
      const actual = create(
        <Carousel slides={SLIDES}>
          {({ step }) => <h1>Carousel heading for step #{step}</h1>}
        </Carousel>
      );

      expect(actual).toMatchSnapshot();
    });

    it('should render with children as a node', () => {
      const actual = create(
        <Carousel slides={SLIDES}>
          <h1>Carousel heading</h1>
        </Carousel>
      );

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      jest.resetModules();

      const wrapper = renderToHtml(<Carousel slides={SLIDES} />);
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
