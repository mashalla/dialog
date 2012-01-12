Accessible Dialog
===========

Accessible Modal Dialog

![Screenshot](http://www.accessiblemootoolsdemo.iao.fraunhofer.de/Mootools_Widgets/WidgetThumbs/Dialog.png)

How to use
----------

	#HTML
	<input class='button' id="dialogDemo" type="button" value="trigger Dialog" role="button"/>

	#JS
	window.addEvent('domready', function(){
	    var dialogCme = new DialogCME({
			'alert':false, // Is it an alert dialog?
			'closeButton':true, // Do you need a closeButton?
			'title':'DemoDialog', // Title of the dialog
			'content':"<p>This is an Wai Aria Demo Dialog</p><p>Please enter information.</p><label for='field1'>field 1: </label><input id='field1' type='text'><br><br><label for='field2'>field 2: </label><input id='field2'type='text'>",
			'submit':{
				'exists':true, 
				'value':'Submit',
				'fn': function(e){ // Function which is triggered by pushing the submit button
					this.hide()
				}
			},		
			'cancel':{
				'exists':true,
				'value':'Cancel',
				'fn': function(e){ // Function which is triggered by pushing the submit button
					this.hide()
				}
			}
		});
	    // Defines when the dialog is triggered
	    $('dialogDemo').addEvent('click', function(e){
	        e = new Event(e).stop();
	        dialogCme.show();
	    }.bind(this));
	});