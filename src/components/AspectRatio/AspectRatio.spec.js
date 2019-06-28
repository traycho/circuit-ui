import React from 'react';

import AspectRatio from './AspectRatio';

describe.skip('AspectRatio', () => {
  it('should render with default styles', () => {
    const actual = create(
      <AspectRatio>
        <div />
      </AspectRatio>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with fixed aspect ratio styles', () => {
    const actual = create(
      <AspectRatio aspectRatio={1.618}>
        <div />
      </AspectRatio>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should not render without children', () => {
    const actual = create(<AspectRatio spectRatio={1.618} />);
    expect(actual).toMatchSnapshot();
  });
});
