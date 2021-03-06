/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('UI Customization', () => {
  const UiUtils = shaka.test.UiUtils;
  /** @type {!Element} */
  let cssLink;
  /** @type {!HTMLElement} */
  let container;
  /** @type {!HTMLMediaElement} */
  let video;

  beforeAll(async () => {
    // Add css file
    cssLink = document.createElement('link');
    await UiUtils.setupCSS(cssLink);
  });

  afterEach(async () => {
    await UiUtils.cleanupUI();
  });

  afterAll(() => {
    document.head.removeChild(cssLink);
  });

  beforeEach(() => {
    container =
      /** @type {!HTMLElement} */ (document.createElement('div'));
    document.body.appendChild(container);

    video = shaka.util.Dom.createVideoElement();
    container.appendChild(video);
  });

  it('only the specified controls are created', () => {
    const config = {controlPanelElements: ['time_and_duration', 'mute']};
    UiUtils.createUIThroughAPI(container, video, config);

    // Only current time and mute button should've been created
    UiUtils.confirmElementFound(container, 'shaka-current-time');
    UiUtils.confirmElementFound(container, 'shaka-mute-button');

    UiUtils.confirmElementMissing(container, 'shaka-volume-bar');
    UiUtils.confirmElementMissing(container, 'shaka-fullscreen-button');
    UiUtils.confirmElementMissing(container, 'shaka-overflow-menu-button');
  });

  it('only the specified overflow menu buttons are created', () => {
    const config = {overflowMenuButtons: ['cast']};
    UiUtils.createUIThroughAPI(container, video, config);

    UiUtils.confirmElementFound(container, 'shaka-cast-button');

    UiUtils.confirmElementMissing(container, 'shaka-caption-button');
  });

  it('seek bar is not created unless configured', () => {
    const config = {addSeekBar: false};
    UiUtils.createUIThroughAPI(container, video, config);

    UiUtils.confirmElementMissing(container, 'shaka-seek-bar');
  });

  it('seek bar is created when configured', () => {
    const config = {addSeekBar: true};
    UiUtils.createUIThroughAPI(container, video, config);

    UiUtils.confirmElementFound(container, 'shaka-seek-bar');
  });

  it('settings menus are positioned lower when seek bar is absent',
      () => {
        const config = {addSeekBar: false};
        UiUtils.createUIThroughAPI(container, video, config);

        function confirmLowPosition(className) {
          const elements =
            container.getElementsByClassName(className);
          expect(elements.length).toBe(1);
          expect(
              elements[0].classList.contains('shaka-low-position')).toBe(true);
        }

        UiUtils.confirmElementMissing(container, 'shaka-seek-bar');

        confirmLowPosition('shaka-overflow-menu');
        confirmLowPosition('shaka-resolutions');
        confirmLowPosition('shaka-audio-languages');
        confirmLowPosition('shaka-text-languages');
      });

  it('controls are created in specified order', () => {
    const config = {
      controlPanelElements: [
        'mute',
        'time_and_duration',
        'fullscreen',
      ],
    };

    UiUtils.createUIThroughAPI(container, video, config);

    const controlsButtonPanels =
        container.getElementsByClassName('shaka-controls-button-panel');
    expect(controlsButtonPanels.length).toBe(1);
    const controlsButtonPanel =
    /** @type {!HTMLElement} */ (controlsButtonPanels[0]);

    const buttons = controlsButtonPanel.childNodes;
    expect(buttons.length).toBe(3);

    expect( /** @type {!HTMLElement} */ (buttons[0]).className)
        .toContain('shaka-mute-button');
    expect( /** @type {!HTMLElement} */ (buttons[1]).className)
        .toContain('shaka-current-time');
    expect( /** @type {!HTMLElement} */ (buttons[2]).className)
        .toContain('shaka-fullscreen');
  });
});
