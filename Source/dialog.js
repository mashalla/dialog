/*
---
script: dialog.js
description: ---
license: MIT-style license
authors:
- Christian Merz
requires:
- core:1.3.2/Element.Event
provides: [dialogCME]
...
*/
var DialogCME = new Class({
    Implements: [Options, Events],
    
    options: {
        classPrefix: 'MooAccessDialog',
        zIndex: '1001',
        alert: false,
        closeButton: false,
        title: 'Dialog',
        content: '',
        submit: {
            existing: 'false'
        },
        cancel: {
            existing: 'false'
        }
    },
    initialize: function(options){
        this.setOptions(options);
        this.lastFocus = null;
        this.mask = false;
        this.dialog = false;
        this.isShowing = false;
        this.add_dialog();
        this.addEvents();
    },
    add_dialog: function(){
        if (!this.dialog) {
            this.dialogContainer = new Element('div', {
                'class': this.options.classPrefix + 'Container',
                'role': 'dialog',
                'aria-labelledby': 'dialogTitle'
            });
            this.dialogContainer.setStyle('z-index', this.options.zIndex);
            if (this.options.alert) {
                this.dialogContainer.setProperty('role', 'alertdialog');
            }
            
            
            if (!this.mask) {
                this.mask = new Element('div', {
                    'class': this.options.classPrefix + 'Mask'
                }).inject(this.dialogContainer);
                this.mask.setOpacity(0.3);
            }
            
            this.dialog = new Element('div', {
                'class': this.options.classPrefix + 'Dialog'
            }).inject(this.dialogContainer);
            
            var header = new Element('div', {
                'class': this.options.classPrefix + 'Header'
            }).inject(this.dialog);
            
            this.content = new Element('div', {
                'class': this.options.classPrefix + 'Content'
            }).inject(this.dialog);
            
            if (this.options.submit.exists || this.options.cancel.exists) {
                var hr = new Element('hr', {
                    'class': this.options.classPrefix
                }).inject(this.dialog);
                
                var buttons = new Element('div', {
                    'class': this.options.classPrefix + 'Buttons'
                }).inject(this.dialog);
            }
            
            var title = new Element('span', {
                'class': this.options.classPrefix + 'Title',
                'text': this.options.title,
                'id': 'dialogTitle'
            }).inject(header);
            
            if (this.options.closeButton) {
                var close = new DButton({
                    'classPrefix': this.options.classPrefix + 'Button',
                    'value': '  x  ',
                    'ariaLabel': 'Click to close',
                    'additionalClass': 'close',
                    'clickFunction': function(e){
                        this.hide();
                    }
.bind(this)
                }).button.inject(header);
            }
            
            if (this.options.content) {
                this.content.setProperty('html', this.options.content);
            }
            
            if (this.options.submit.exists) {
                var submit = new DButton({
                    'classPrefix': this.options.classPrefix + 'Button',
                    'value': this.options.submit.value,
                    'clickFunction': this.options.submit.fn.bind(this)
                }).button.inject(buttons);
            }
            
            if (this.options.cancel.exists) {
                var cancel = new DButton({
                    'classPrefix': this.options.classPrefix + 'Button',
                    'value': this.options.cancel.value,
                    'clickFunction': this.options.cancel.fn.bind(this)
                }).button.inject(buttons);
            }
            
            this.dialogContainer.inject(document.body);
        }
    },
    addEvents: function(){
        var self = this;
        self.dialogContainer.addEvent('keydown', function(e){
            if (self.isShowing) {
                switch (e.key) {
                    case 'esc':
                        e.stop();
                        self.hide();
                        break;
                    case 'tab':
                        if (!e.shift) {
                            if (e.target == getLastTabbableChild(self.dialog)) {
                                getFirstTabbableChild(self.dialog).focus();
                                e.stop();
                            }
                        }
                        else {
                            if (e.target == getFirstTabbableChild(self.dialog)) {
                                getLastTabbableChild(self.dialog).focus();
                                e.stop();
                            }
                        }
                        break;
                }
            }
        });
    },
    show: function(){
        this.dialogContainer.setStyles({
            'opacity': 1,
            'display': 'block'
        });
        if (Browser.ie && Browser.version <= 8) {
            this.dialog.setStyles({
                'margin-top': (-this.dialog.offsetHeight / 2) + document.body.scrollTop,
                'margin-left': (-this.dialog.offsetWidth / 2) + document.body.scrollLeft
            });
        }
        else {
            this.dialog.setStyles({
                'margin-top': (-this.dialog.offsetHeight / 2) + window.pageYOffset,
                'margin-left': (-this.dialog.offsetWidth / 2) + window.pageXOffset
            });
        }
        this.lastFocus = document.activeElement;
        getFirstTabbableChild(this.content).focus();
        this.isShowing = true;
    },
    hide: function(){
        this.dialogContainer.setStyles({
            'opacity': 0,
            'display': 'none'
        });
        this.lastFocus.focus();
        this.isShowing = false;
    }
});

var DButton = new Class({
    Implements: [Options, Events],
    
    options: {
        classPrefix: 'MooAccessButton',
        value: 'button',
        role: 'button',
        ariaLabel: null,
        additionalClass: null,
        clickFunction: function(e){
        }
    },
    initialize: function(options){
        this.setOptions(options);
        
        this.button = new Element('input', {
            'type': 'button',
            'value': this.options.value,
            'class': this.options.classPrefix,
            'role': this.options.button
        });
        if (this.options.ariaLabel) {
            this.button.setProperty('aria-label', this.options.ariaLabel)
        }
        if (this.options.additionalClass) {
            this.button.addClass(this.options.additionalClass)
        }
        this.button.addEvent('click', this.options.clickFunction)
    }
    
});

// --- extended ----------- Start Edit --------------------------------
// additional functions to get the first, the last or the next tabbable child

function getFirstTabbableChild(treeToCheck){
    var els = treeToCheck.getElementsByTagName('*');
    for (var i = 0; i < els.length; i++) {
        if (isTabbable(els[i])) {
            return els[i];
        }
    }
    return null;
}

function getLastTabbableChild(treeToCheck){
    var els = treeToCheck.getElementsByTagName('*');
    for (var i = els.length - 1; i >= 0; i--) {
        if (isTabbable(els[i])) {
            return els[i];
        }
    }
    return null;
}

function isTabbable(elementToCheck){

    if (hasAttribute(elementToCheck, 'tabindex')) {
    
        if (elementToCheck.getAttribute('tabindex') != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    else 
        if (elementToCheck.nodeName == 'INPUT' || elementToCheck.nodeName == 'A' || elementToCheck.nodeName == 'TEXTAREA' || elementToCheck.nodeName == 'BUTTON') {
            return true;
        }
        else {
            return false;
        }
}

function hasAttribute(obj, attr){
    return !!obj.getAttribute(attr);
}

// --- extended ----------- End Edit ---------------------------------
