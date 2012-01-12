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
window.addEvent('domready', function(){

    var dialogCme = new DialogCME({
		'alert':false,
		'closeButton':true,
		'title':'DemoDialog',
		'content':"<p>This is an Wai Aria Demo Dialog</p><p>Please enter information.</p><label for='field1'>field 1: </label><input id='field1' type='text'><br><br><label for='field2'>field 2: </label><input id='field2'type='text'>",
		'submit':{
			'exists':true,
			'value':'Submit',
			'fn': function(e){
				this.hide()
			}
		},		
		'cancel':{
			'exists':true,
			'value':'Cancel',
			'fn': function(e){
				this.hide()
			}
		}
	});
    
    $('dialogDemo').addEvent('click', function(e){
        e = new Event(e).stop();
        dialogCme.show();
    }
.bind(this));
});