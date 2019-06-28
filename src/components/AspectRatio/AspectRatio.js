import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { ClassNames, css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';

console.log(ClassNames);

const wrapperBaseStyles = () => css`
  display: block;
  position: relative;
  overflow: hidden;
  height: auto;
  width: 100%;
`;

const wrapperAspectRatioStyles = ({ aspectRatio }) =>
  aspectRatio &&
  css`
    height: 0;
    width: 100%;
    padding-top: ${Math.round((1 / aspectRatio) * 100)}%;
  `;

const Wrapper = styled('div')(wrapperBaseStyles, wrapperAspectRatioStyles);

const childBaseStyles = cssClassName => cssClassName`
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
`;

const childAspectRatioStyles = (cssClassName, { aspectRatio }) =>
  aspectRatio &&
  cssClassName`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: none;
    object-fit: cover;
    z-index: 2;
  `;

function AspectRatio({ aspectRatio, children, className }) {
  if (!children) {
    return null;
  }

  const [child, ...restChildren] = Children.toArray(children);
  return (
    <Wrapper aspectRatio={aspectRatio} className={className}>
      <ClassNames>
        {({ css: cssClassName, cx }) =>
          React.cloneElement(child, {
            className: cx(
              childBaseStyles(cssClassName),
              childAspectRatioStyles(cssClassName, { aspectRatio })
            )
          })
        }
      </ClassNames>
      {restChildren}
    </Wrapper>
  );
}

AspectRatio.propTypes = {
  children: childrenPropType,
  aspectRatio: PropTypes.number,
  className: PropTypes.string
};

export default AspectRatio;
