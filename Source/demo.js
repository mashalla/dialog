/*
 ---
 description: demo application
 license: MIT-style
 authors:
 - Truman Leung
 requires:
 - core/1.3: '*'
 - more/1.2.4: Fx.Elements
 provides: Ascribe Dialog
 version: 0.3
 ...
 */
 
// -------------------------------------------------------------------
//
// last edit: 2011 - 02 - 18
//
// author: Christian Merz
//
// instantiation of different dialogs
//
// --------------------------------------------------------------------

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
