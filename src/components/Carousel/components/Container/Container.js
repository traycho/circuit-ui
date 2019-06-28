import styled, { css } from 'react-emotion';

const baseStyles = css`
  label: carousel__container;
  width: 100%;
  height: auto;
  position: relative;
`;
const Container = styled('div')(baseStyles);

export default Container;
