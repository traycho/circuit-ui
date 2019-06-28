import React from 'react';

import SlideImage from './SlideImage';

const image = {
  src: 'https://placedog.net/800/500',
  alt: 'random pic'
};

describe('SlideImage', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<SlideImage src={image.src} alt={image.alt} />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with custom aspect ratio', () => {
      const actual = create(
        <SlideImage src={image.src} alt={image.alt} aspectRatio={2} />
      );

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SlideImage src={image.src} alt={image.alt} />
      );
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
