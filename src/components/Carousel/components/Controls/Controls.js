import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: carousel__controls;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacings.mega};
`;
const Controls = styled('div')(baseStyles);

export default Controls;
