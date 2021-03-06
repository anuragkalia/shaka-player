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

goog.provide('shaka.util.MapUtils');


/**
 * @summary A set of map/object utility functions.
 */
shaka.util.MapUtils = class {
  /**
   * @param {!Object.<KEY, VALUE>} object
   * @return {!Map.<KEY, VALUE>}
   * @template KEY,VALUE
   */
  static asMap(object) {
    const map = new Map();
    for (const key of Object.keys(object)) {
      map.set(key, object[key]);
    }

    return map;
  }


  /**
   * @param {!Map.<KEY, VALUE>} map
   * @return {!Object.<KEY, VALUE>}
   * @template KEY,VALUE
   */
  static asObject(map) {
    const obj = {};
    map.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }
};
