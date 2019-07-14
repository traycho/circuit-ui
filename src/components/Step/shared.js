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

// eslint-disable-next-line import/prefer-default-export
export const defaultProps = {
  totalSteps: 0,
  initialStep: 0,
  autoPlay: false,
  cycle: false,
  swipe: false,
  stepInterval: 1,
  animationDuration: 0,
  stepDuration: 0,
  onPlay: () => {},
  onPause: () => {},
  onNext: () => {},
  onPrevious: () => {}
};
