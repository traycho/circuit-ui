import styled, { css } from 'react-emotion';

const baseStyles = css`
  label: carousel__slides;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: auto;
`;
const Slides = styled('div')(baseStyles);

export default Slides;
