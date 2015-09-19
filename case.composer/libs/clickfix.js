/**
 * This is the solution for adding click event for elements on devices which support
 * both touch and mouse gesture, commonly PCs with touchscreen
 * The main idea is binding the event handler to both 'click' and 'touchend' event,
 * if the 'touchend' event is triggered then we will cancel the 'click' event
 */

'use strict';
MYLIB.namespace("MYLIB.clickfix");

MYLIB.clickfix.Win8ClickHandler = function() {
};

MYLIB.clickfix.Win8ClickHandler.handlerArray = [];
MYLIB.clickfix.Win8ClickHandler.THRESHOLD = 10;

MYLIB.clickfix.Win8ClickHandler.add = function(element, handler, data) {
    return new MYLIB.clickfix.Win8ClickHandler().init(element, handler, data);
};

MYLIB.clickfix.Win8ClickHandler.remove = function(element, handler) {
    var Win8ClickHandler = MYLIB.clickfix.Win8ClickHandler;
    for (var index = 0; index < Win8ClickHandler.handlerArray.length; index++) {
        var instance = Win8ClickHandler.handlerArray[index];
        if (element === instance.getElement() && handler === instance.getHandler()) {
            instance.destroy();
            instance = null;
            Win8ClickHandler.handlerArray.splice(index, 1);
            break;
        };
    }
};

MYLIB.clickfix.Win8ClickHandler.prototype._startX = null;
MYLIB.clickfix.Win8ClickHandler.prototype._startY = null;
MYLIB.clickfix.Win8ClickHandler.prototype._element = null;
MYLIB.clickfix.Win8ClickHandler.prototype._handler = null;
MYLIB.clickfix.Win8ClickHandler.prototype._eventData = null;
MYLIB.clickfix.Win8ClickHandler.prototype._touchMoveCallback = null;
MYLIB.clickfix.Win8ClickHandler.prototype._clickCallback = null;

MYLIB.clickfix.Win8ClickHandler.prototype.getElement = function() {
    return this._element;
};

MYLIB.clickfix.Win8ClickHandler.prototype.getHandler = function() {
    return this._handler;
};

MYLIB.clickfix.Win8ClickHandler.prototype.init = function(element, handler, data) {
    this._element = element;
    
    this._eventData = data;
    this._handler = handler;
    
    this._clickCallback = this.onClick.bind(this);
    this._touchMoveCallback = this.onTouchMove.bind(this);

    element.on('click', this._clickCallback);
    element.on('touchstart', this._touchMoveCallback);

    MYLIB.clickfix.Win8ClickHandler.handlerArray.push(this);

    return this;
};

MYLIB.clickfix.Win8ClickHandler.prototype.destroy = function() {
    this._element.off('click', this._clickCallback);
    this._element.off('touchstart', this._touchMoveCallback);
};

MYLIB.clickfix.Win8ClickHandler.prototype.onTouchStart = function(e) {    
    //Start listening to touchmove and touchend method when user touchs the screen
    this._element.on('touchmove', this._touchMoveCallback);
    this._element.on('touchend', this._clickCallback);
    
    this._startX = e.originalEvent.touches[0].clientX;
    this._startY = e.originalEvent.touches[0].clientY;
};

MYLIB.clickfix.Win8ClickHandler.prototype.onClick = function(e) {
    this.reset();
    if (this._eventData) {
        e["data"] = this._eventData;
    }
    
    //Invoke the actual click handler and prevent ghost clicks if this was a touchend event.
    this._handler(e);
    
    if (e.type === "touchend") {
        var ClickBuster = MYLIB.clickfix.ClickBuster;
        if (!ClickBuster.instance) {
            ClickBuster.instance = new ClickBuster().init();
        }
        ClickBuster.instance.preventGhostClick(this._startX, this._startY);
    };
};

MYLIB.clickfix.Win8ClickHandler.prototype.onTouchMove = function(e) {
    //When touchmove event is invoked, check if the user has dragged past the threshold of 10px
    var touch = e.originalEvent.touches[0];
    var distance = Math.sqrt(Math.pow(this._startX - touch.clientX, 2) + Math.pow(this._startY - touch.clientY, 2));
    if (distance > MYLIB.clickfix.Win8ClickHandler.THRESHOLD) {
        this.reset();
    }
};

MYLIB.clickfix.Win8ClickHandler.prototype.reset = function() {
    this._element.off('touchmove', this._touchMoveCallback);
    this._element.off('touchend', this._clickCallback);
};

/**
 * When tapping a element, a click event will still be fired 300ms later.
 * So we came up with ClickBuster to solve this issue, the idea is simply adding a click event listener to the body,
 * listening on the capture phase. When our listener is invoked, we try to
 * determine if the click was as a result of a tap that we already handled,
 * and if so we call preventDefault and stopPropagation on it.
 */
MYLIB.clickfix.ClickBuster = function() {
};

MYLIB.clickfix.ClickBuster.instance = null;

MYLIB.clickfix.ClickBuster.prototype._coordinates = null;

MYLIB.clickfix.ClickBuster.prototype.init = function() {
    this._coordinates = [];
    document.addEventListener('click', this.onClick.bind(this), true);
    document.addEventListener('mouseup', this.onClick.bind(this), true);
    return this;
};

/**
 * Bust all click events that happen within 25px of the provided x, y coordinates in the next 1.5s.
 */
MYLIB.clickfix.ClickBuster.prototype.preventGhostClick = function(x, y) {
    this._coordinates.push(x, y);
    window.setTimeout(this.pop.bind(this), 1500);
};

MYLIB.clickfix.ClickBuster.prototype.pop = function() {
    this._coordinates.splice(0, 2);
};

/**
 * If we catch a click event inside the given radius and time threshold then we call
 * stopPropagation and preventDefault. Calling preventDefault will stop links
 * from being activated.
 */
MYLIB.clickfix.ClickBuster.prototype.onClick = function(e) {
    for (var i = 0; i < this._coordinates.length; i += 2) {
        var x = this._coordinates[i];
        var y = this._coordinates[i + 1];
        if (Math.abs(e.clientX - x) < 25 && Math.abs(e.clientY - y) < 25) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
};