/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { renderHook, act } from '@testing-library/react-hooks';

import useStateAndHelpers from './use-state-and-helpers';

describe('useStateAndHelpers', () => {
  it('should return state based on default values', () => {
    const defaults = {
      initialStep: 0,
      totalSteps: 2,
      cycle: true,
      autoPlay: false
    };
    const { result, unmount } = renderHook(() => useStateAndHelpers(defaults));

    expect(result.current).toMatchObject({
      step: defaults.initialStep,
      previousStep: defaults.totalSteps - 1,
      paused: true
    });

    unmount();
  });

  it('should return actions and prop getters', () => {
    const expected = expect.objectContaining({
      play: expect.any(Function),
      pause: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function),
      getStepProps: expect.any(Function),
      getPlayControlProps: expect.any(Function),
      getPauseControlProps: expect.any(Function),
      getNextControlProps: expect.any(Function),
      getPreviousControlProps: expect.any(Function)
    });
    const { result, unmount } = renderHook(() => useStateAndHelpers());

    expect(result.current).toMatchObject(expected);

    unmount();
  });

  it('should throw error if cycle is used without totalSteps prop', () => {
    expect(() => useStateAndHelpers({ cycle: true })).toThrow();
  });

  it('should throw error if autoPlay is used without stepDuration prop', () => {
    expect(() => useStateAndHelpers({ autoPlay: true })).toThrow();
  });

  it('should update paused state when pause action is called', () => {
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({
        autoPlay: true,
        stepDuration: 3000
      })
    );

    expect(result.current.paused).toEqual(false);

    act(() => {
      result.current.pause();
    });

    expect(result.current.paused).toEqual(true);

    unmount();
  });

  it('should update paused state when play action is called', () => {
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({
        autoPlay: false,
        stepDuration: 3000
      })
    );

    expect(result.current.paused).toEqual(true);

    act(() => {
      result.current.play();
    });

    expect(result.current.paused).toEqual(false);

    unmount();
  });

  it('should not update state if play action is called repeatedly', () => {
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({
        autoPlay: false,
        stepDuration: 3000
      })
    );

    expect(result.current.paused).toEqual(true);

    act(() => {
      result.current.play();
    });

    expect(result.current.paused).toEqual(false);

    act(() => {
      result.current.play();
    });

    expect(result.current.paused).toEqual(false);

    unmount();
  });

  it('should not update paused state when step duration is missing in props', () => {
    const { result, unmount } = renderHook(() => useStateAndHelpers());

    expect(result.current.paused).toEqual(true);

    act(() => {
      result.current.play();
    });

    expect(result.current.paused).toEqual(true);

    unmount();
  });

  it('should update steps state when next action is called', () => {
    const initialStep = 1;
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({ initialStep })
    );

    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(initialStep - 1);

    act(() => {
      result.current.next();
    });

    expect(result.current.step).toEqual(initialStep + 1);
    expect(result.current.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should update steps state when previous action is called', () => {
    const initialStep = 1;
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({ initialStep })
    );

    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(initialStep - 1);

    act(() => {
      result.current.previous();
    });

    expect(result.current.step).toEqual(initialStep - 1);
    expect(result.current.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should update steps state based on used step interval', () => {
    const initialStep = 1;
    const stepInterval = 3;
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({ initialStep, stepInterval })
    );

    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(0);

    act(() => {
      result.current.next();
    });

    expect(result.current.step).toEqual(initialStep + stepInterval);
    expect(result.current.previousStep).toEqual(initialStep);

    act(() => {
      result.current.previous();
    });

    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(initialStep + stepInterval);

    unmount();
  });

  it('should automatically change steps based on step and animation duration', async () => {
    const initialStep = 1;
    const stepInterval = 1;
    const { result, waitForNextUpdate, unmount } = renderHook(() =>
      useStateAndHelpers({
        initialStep,
        stepInterval,
        autoPlay: true,
        stepDuration: 100,
        animationDuration: 100
      })
    );

    expect(result.current.paused).toEqual(false);
    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(initialStep - stepInterval);

    await removeActWarning(waitForNextUpdate);

    expect(result.current.paused).toEqual(false);
    expect(result.current.step).toEqual(initialStep + stepInterval);
    expect(result.current.previousStep).toEqual(initialStep);

    act(() => {
      result.current.pause();
    });

    expect(result.current.paused).toEqual(true);
    expect(result.current.step).toEqual(initialStep + stepInterval);
    expect(result.current.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should should accept functions for step and animation duration', async () => {
    const initialStep = 1;
    const stepInterval = 1;
    const { result, waitForNextUpdate, unmount } = renderHook(() =>
      useStateAndHelpers({
        initialStep,
        stepInterval,
        autoPlay: true,
        stepDuration: () => 100,
        animationDuration: () => 100
      })
    );

    expect(result.current.paused).toEqual(false);
    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(initialStep - stepInterval);

    await removeActWarning(waitForNextUpdate);

    expect(result.current.paused).toEqual(false);
    expect(result.current.step).toEqual(initialStep + stepInterval);
    expect(result.current.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should restart if cycle and totalSteps props are specified', () => {
    const initialStep = 0;
    const stepInterval = 1;
    const totalSteps = 2;
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({
        initialStep,
        stepInterval,
        totalSteps,
        cycle: true
      })
    );

    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(totalSteps - stepInterval);

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toEqual(initialStep + stepInterval);
    expect(result.current.previousStep).toEqual(initialStep);

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toEqual(initialStep);
    expect(result.current.previousStep).toEqual(totalSteps - stepInterval);

    unmount();
  });

  it('should support onPlay action handler props', () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    const { result, unmount } = renderHook(() =>
      useStateAndHelpers({ onPlay, onPause, onNext, onPrevious })
    );

    act(() => {
      result.current.play();
    });
    expect(onPlay).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.pause();
    });
    expect(onPause).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.next();
    });
    expect(onNext).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.previous();
    });
    expect(onPrevious).toHaveBeenCalledTimes(1);

    unmount();
  });
});

// TO DO: Remove this helper after upgrade to React 16.9
// https://github.com/testing-library/react-hooks-testing-library/blob/master/docs/usage/advanced-hooks.md#act-warning
async function removeActWarning(waitForNextUpdate) {
  /* eslint-disable no-console */
  const originalError = console.error;
  console.error = jest.fn();
  try {
    await waitForNextUpdate();
  } finally {
    console.error = originalError;
  }
}
