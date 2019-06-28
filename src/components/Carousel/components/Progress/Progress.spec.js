import React from 'react';

import Progress from './Progress';

describe('Progress', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Progress />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with paused styles', () => {
      const actual = create(<Progress paused />);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Progress />);
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
