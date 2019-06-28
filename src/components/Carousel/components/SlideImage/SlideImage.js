import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Image from '../../../Image';
// import AspectRatio from '../../../AspectRatio';

import { ASPECT_RATIO } from '../../constants';

const backgroundStyles = ({ theme }) => css`
  label: carousel__slideimage;
  background: ${theme.colors.n100};
`;
// fix AspectRatio when upgrade to latest @emotion dependency
const StyledAspectRatio = styled('div')(backgroundStyles);

const imageStyles = css`
  label: carousel__image;
  img {
    object-fit: cover;
  }
`;
const StyledImage = styled(Image)(imageStyles);

const SlideImage = ({ src, alt, aspectRatio, ...props }) => (
  <StyledAspectRatio aspectRatio={aspectRatio}>
    <StyledImage src={src} alt={alt} {...props} />
  </StyledAspectRatio>
);

SlideImage.propTypes = {
  /**
   * Specifies the source URL of an image
   */
  src: PropTypes.string.isRequired,
  /**
   * Provides alternative information if a user cannot view the image,
   * e.g. because of slow connection, an error in the src attribute, or if the
   * user uses a screen reader.
   */
  alt: PropTypes.string.isRequired,
  /**
   * Image aspect ratio
   */
  aspectRatio: PropTypes.number
};

SlideImage.defaultProps = {
  aspectRatio: ASPECT_RATIO
};

export default SlideImage;
