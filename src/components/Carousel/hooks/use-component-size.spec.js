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

import { renderHook, act } from 'react-hooks-testing-library';

import useComponentSize from './use-component-size';

describe('useComponentSize', () => {
  it('should return the current element size', () => {
    const ref = {
      current: {
        offsetWidth: 800,
        offsetHeight: 450
      }
    };
    const { result } = renderHook(() => useComponentSize(ref));

    expect(result.current).toEqual({ width: 800, height: 450 });
  });

  it('should update on resize events', () => {
    const ref = {
      current: {
        offsetWidth: 800,
        offsetHeight: 450
      }
    };

    const { result } = renderHook(() => useComponentSize(ref));

    act(() => {
      ref.current.offsetWidth = 400;

      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 400, height: 450 });
  });
});
