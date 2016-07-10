(function( $ ) {

	'use strict';

	var datatableInit = function() {

		$('#ajaxExample').dataTable({
			deferRender: true,
			ajax: 'assets/ajax/examples/tables.datatables.ajax.json'
		});

	};

	$(function() {
		datatableInit();
	});

}).apply( this, [ jQuery ]);