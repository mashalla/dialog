/*
---
description: demo application

license: MIT-style

authors:
- Alexander Duschek

requires:
  - Core/Class.Extras
  - Core/Element.Event
  - Core/Selectors

provides: [MooDropMenu, Element.MooDropMenu]

accessibility enhancements: WAI ARIA specification (http://www.w3.org/TR/wai-aria-practices/#menu) is implemented, DropDown can be controlled completely by the keyboard.

...
	
 */
window.addEvent('domready', function(){

    var modaldemo = new AscModalAlertConfirm();
    
    $('dialogDemo').addEvent('click', function(e){
        e = new Event(e).stop();
        modaldemo.show_demo('e', '', 'Demo Dialog', "<p>This is an Wai Aria Demo Dialog</p><p>Please enter information.</p><label for='field1'>field 1: </label><input id='field1' type='text'><br><br><label for='field2'>field 2: </label><input id='field2'type='text'>", "Submit", 'i16 ok16', function(e){
            this.hide();
        });
    }
.bind(this));
    
});
