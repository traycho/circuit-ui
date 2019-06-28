import { SLIDE_DIRECTIONS } from '../../constants';

export function getStackOrder(slideIndex, step, prevStep, slideDirection) {
  const isActive = step === slideIndex;
  const wasActive = prevStep === slideIndex;

  if (slideDirection === SLIDE_DIRECTIONS.FORWARD && isActive) {
    return 2;
  }

  if (slideDirection === SLIDE_DIRECTIONS.FORWARD && wasActive) {
    return 1;
  }

  if (slideDirection === SLIDE_DIRECTIONS.BACK && isActive) {
    return 1;
  }

  if (slideDirection === SLIDE_DIRECTIONS.BACK && wasActive) {
    return 2;
  }

  return slideIndex ? -slideIndex : 0;
}

export function shouldAnimate(slideIndex, step, prevStep, slideDirection) {
  const isActive = step === slideIndex;
  const wasActive = prevStep === slideIndex;

  if (slideDirection === SLIDE_DIRECTIONS.FORWARD) {
    return isActive;
  }

  if (slideDirection === SLIDE_DIRECTIONS.BACK) {
    return wasActive;
  }

  return false;
}

export function getDynamicWidth(width) {
  return width ? `${width}px` : '100%';
}
