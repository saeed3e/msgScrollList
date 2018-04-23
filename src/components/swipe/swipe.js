// https://github.com/GoogleChromeLabs/ui-element-samples/tree/gh-pages/swipeable-cards

/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
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

"use strict";

Element.prototype._parent = function(selector) {
  var elem = this;
  var ishaveselector = selector !== undefined;

  while ((elem = elem.parentElement) !== null) {
    if (elem.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    if (!ishaveselector || elem.matches(selector)) {
      return elem;
    }
  }
};

export class Cards {
  constructor(obj) {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);
    this.targetBCR = null;
    this.target = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;
    this.targetX = 0;
    this.draggingCard = false;
    this.targetNodeClass = obj.targetNodeClass;
    this.delegatedNodeSelector = obj.parentNodeSelector;

    this.onCardDismissed = obj.onCardDismissed;

    this.addEventListeners();

    requestAnimationFrame(this.update);
  }

  addEventListeners() {
    const delegatedNodeSelector = document.querySelector(this.delegatedNodeSelector) || document;
    delegatedNodeSelector.addEventListener("touchstart", this.onStart);
    delegatedNodeSelector.addEventListener("touchmove", this.onMove);
    delegatedNodeSelector.addEventListener("touchend", this.onEnd);
    delegatedNodeSelector.addEventListener("mousedown", this.onStart);
    delegatedNodeSelector.addEventListener("mousemove", this.onMove);
    delegatedNodeSelector.addEventListener("mouseup", this.onEnd);
  }

  onStart(evt) {
    // debugger
    if (this.target) return;
    console.log('.'+this.targetNodeClass);
    
    const isParentTarget = evt.target._parent('.'+this.targetNodeClass);
    if (!isParentTarget) return;

    this.target = isParentTarget;
    this.targetBCR = this.target.getBoundingClientRect();

    this.startX = evt.pageX || evt.touches[0].pageX;
    this.currentX = this.startX;

    this.draggingCard = true;
    this.target.style.willChange = "transform";
  }

  onMove(evt) {
    if (!this.target) return;

    this.currentX = evt.pageX || evt.touches[0].pageX;
  }

  onEnd(evt) {
    if (!this.target) return;

    this.targetX = 0;
    let screenX = this.currentX - this.startX;
    const threshold = this.targetBCR.width * 0.35;
    if (Math.abs(screenX) > threshold) {
      this.targetX = screenX > 0 ? this.targetBCR.width : -this.targetBCR.width;
    }

    this.draggingCard = false;
  }

  update() {
    requestAnimationFrame(this.update);

    if (!this.target) return;

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (this.targetX - this.screenX) / 4;
    }

    const normalizedDragDistance =
      Math.abs(this.screenX) / this.targetBCR.width;
    const opacity = 1 - Math.pow(normalizedDragDistance, 0.5);

    this.target.style.transform = `translateX(${this.screenX}px)`;
    this.target.style.opacity = opacity;

    // User has finished dragging.
    if (this.draggingCard) return;

    const isNearlyAtStart = Math.abs(this.screenX) < 0.1;
    const isNearlyInvisible = opacity < 0.01;

    // If the card is nearly gone.
    if (isNearlyInvisible) {
      // Bail if there's no target or it's not attached to a parent anymore.
      if (!this.target || !this.target.parentNode) return;

      this.target.style.opacity = 1;
      this.target.style.transform = "none";
      this.target.style.willChange = "initial";
      let index = this.target.getAttribute("index");
      if (this.target) {
        this.target = null;
        this.onCardDismissed(parseInt(index));
      }
    } else if (isNearlyAtStart) {
      this.resetTarget();
    }
  }

  resetTarget() {
    if (!this.target) return;

    this.target.style.willChange = "initial";
    this.target.style.transform = "none";
    this.target = null;
  }
}
