/* eslint-disable max-len */
import * as SlideService from './SlideService';

import { SLIDE_DIRECTIONS } from '../../constants';

describe('SlideService', () => {
  describe('getStackOrder', () => {
    it('should return zero index when called without arguments', () => {
      expect(SlideService.getStackOrder()).toEqual(0);
    });

    describe('when going forward', () => {
      it('should return top index for active slide', () => {
        expect(
          SlideService.getStackOrder(0, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(2);
      });

      it('should return under top index for previous active slide', () => {
        expect(
          SlideService.getStackOrder(2, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(1);
      });

      it('should return negative index for other slides', () => {
        expect(
          SlideService.getStackOrder(1, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(-1);
      });
    });

    describe('when going back', () => {
      it('should return top index for previous active slide', () => {
        expect(
          SlideService.getStackOrder(2, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(2);
      });

      it('should return under top index for active slide', () => {
        expect(
          SlideService.getStackOrder(0, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(1);
      });

      it('should return negative index for other slides', () => {
        expect(
          SlideService.getStackOrder(1, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(-1);
      });
    });
  });

  describe('shouldAnimate', () => {
    describe('when going forward', () => {
      it('should animate slide with index for current active step', () => {
        expect(
          SlideService.shouldAnimate(0, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(true);
      });

      it('should not animate slide for not matching index and steps', () => {
        expect(
          SlideService.shouldAnimate(0, 1, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(false);
      });
    });

    describe('when going back', () => {
      it('should animate slide with index for previous active step', () => {
        expect(
          SlideService.shouldAnimate(2, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(true);
      });

      it('should not animate slide for not matching index steps when going back', () => {
        expect(
          SlideService.shouldAnimate(0, 1, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(false);
      });
    });
  });

  describe('getDynamicWidth', () => {
    it('should return 100% when width is not specified', () => {
      expect(SlideService.getDynamicWidth()).toEqual('100%');
    });

    it('should return width in pixels when it is specified', () => {
      expect(SlideService.getDynamicWidth(500)).toEqual('500px');
    });
  });
});
