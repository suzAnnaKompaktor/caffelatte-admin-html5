(function() {

	'use strict';
	
	$("#form").validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		}
	});
	
	// validation summary
	var $formSummary = $("#formSummary");
	$formSummary.validate({
		errorContainer: $formSummary.find( 'div.messages.error' ),
		errorLabelContainer: $formSummary.find( 'div.messages.error ul' ),
		wrapper: "li"
	});

}).apply( this, [ jQuery ]);