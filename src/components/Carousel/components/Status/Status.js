import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Text from '../../../Text';

const textStyles = ({ theme }) => css`
  margin-bottom: 0;

  ${theme.mq.untilKilo`
    ${theme.typography.text.kilo};
  `}
`;
const StyledText = styled(Text)(textStyles);

const Status = ({ step, total, ...props }) => (
  <StyledText bold {...props}>
    {step + 1} / {total}
  </StyledText>
);

Status.propTypes = {
  /**
   * Current active index of a carousel
   */
  step: PropTypes.number,
  /**
   * Total number of slides in a carousel
   */
  total: PropTypes.number
};

Status.defaultProps = {
  step: 0,
  total: 0
};

export default Status;
