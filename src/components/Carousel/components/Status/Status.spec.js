import React from 'react';

import Status from './Status';

describe('Status', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Status step={1} total={3} />);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Status step={1} total={3} />);
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
