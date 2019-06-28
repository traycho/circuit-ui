import React from 'react';

import { ButtonList, PlayButton, NextButton, PrevButton } from './Buttons';

const renderButtons = () => (
  <ButtonList>
    <PlayButton />
    <PlayButton paused />
    <PrevButton />
    <NextButton />
  </ButtonList>
);

describe('Buttons', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(renderButtons());

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(renderButtons());
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
