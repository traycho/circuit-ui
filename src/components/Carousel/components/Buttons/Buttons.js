import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import CircuitUIButton from '../../../Button';

import PlayIcon from './icons/play.svg';
import ArrowIcon from './icons/arrow.svg';
import PauseIcon from './icons/pause.svg';

const buttonListStyles = css`
  label: carousel__buttonlist;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ButtonList = styled('div')(buttonListStyles);

const baseButtonStyles = ({ theme }) => css`
  label: carousel__button;
  background-color: ${theme.colors.n300};
  width: ${theme.iconSizes.giga};
  height: ${theme.iconSizes.giga};
  padding: 0;
  overflow: hidden;
  border-radius: 50%;

  margin-left: ${theme.spacings.byte};

  &:first-of-type {
    margin-left: 0;
  }
  &:active,
  &:focus,
  &:hover {
    padding: 0;
  }

  ${theme.mq.untilKilo`
    width: ${theme.iconSizes.mega};
    height: ${theme.iconSizes.mega};

    svg {
      width: 25%;
    }
  `}
`;
export const Button = styled(CircuitUIButton)(baseButtonStyles);

// wrapping button content due to flex bug in Safari 10.1
// via https://github.com/philipwalton/flexbugs/issues/236
const innerWrapperStyles = css`
  label: carousel__button--innerwrapper;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InnerWrapper = styled('div')(innerWrapperStyles);

export const NextButton = (props = {}) => (
  <Button {...props}>
    <InnerWrapper>
      <ArrowIcon />
    </InnerWrapper>
  </Button>
);

const prevButtonStyles = css`
  transform: rotate(180deg);
`;
export const PrevButton = styled(NextButton)(prevButtonStyles);

export const PlayButton = ({ paused, ...props }) => (
  <Button {...props} aria-label={paused ? 'play' : 'pause'}>
    <InnerWrapper>{paused ? <PlayIcon /> : <PauseIcon />}</InnerWrapper>
  </Button>
);

PlayButton.propTypes = {
  paused: PropTypes.bool
};
