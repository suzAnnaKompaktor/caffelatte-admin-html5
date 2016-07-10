// Basic
(function() {

	'use strict';

	$('#example01').dataTable();

}).apply( this, [ jQuery ]);

// TableTools
(function() {

	'use strict';
 
	$('#example02').dataTable({
			sDom: "<'text-right mb-md'T>" + $.fn.dataTable.defaults.sDom,
			oTableTools: {
				sSwfPath: 'assets/vendor/jquery-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf',
				aButtons: [
					{
						sExtends: 'pdf',
						sButtonText: 'PDF',
						sButtonClass: 'btn btn-default' 
					},
					{
						sExtends: 'csv',
						sButtonText: 'CSV',
						sButtonClass: 'btn btn-default'
					},
					{
						sExtends: 'xls',
						sButtonText: 'Excel',
						sButtonClass: 'btn btn-default'
					},
					{
						sExtends: 'print',
						sButtonText: 'Print',
						sButtonClass: 'btn btn-default',
						sInfo: 'Please press CTR+P to print or ESC to quit'
					}
				]
			}
		});

}).apply( this, [ jQuery ]);

// Details
(function( $ ) {

	'use strict';

	var datatableInit = function() {
		var $table = $('#example03');

		// format function for row details
		var fnFormatDetails = function( datatable, tr ) {
			var data = datatable.fnGetData( tr );

			return [
				'<table class="table mb-none">',
					'<tr class="b-top-none">',
						'<td><label class="mb-none">Person:</label></td>',
						'<td>' + data[1]+ ' ' + data[4] + '</td>',
					'</tr>',
					'<tr>',
						'<td><label class="mb-none">Location:</label></td>',
						'<td><a href="https://www.google.com/maps/place/' + data[3] + '" target="_blank">' + data[3] + '</a></td>',
					'</tr>',
				'</div>'
			].join('');
		};

		// insert the expand/collapse column
		var th = document.createElement( 'th' );
		var td = document.createElement( 'td' );
		td.innerHTML = '<i data-toggle class="fa fa-lg fa-plus-square-o text-info" style="cursor: pointer;"></i>';
		td.className = "text-center";

		$table
			.find( 'thead tr' ).each(function() {
				this.insertBefore( th, this.childNodes[0] );
			});

		$table
			.find( 'tbody tr' ).each(function() {
				this.insertBefore(  td.cloneNode( true ), this.childNodes[0] );
			});

		// initialize
		var datatable = $table.dataTable({
			aoColumnDefs: [{
				bSortable: false,
				aTargets: [ 0 ]
			}],
			aaSorting: [
				[1, 'asc']
			]
		});

		// add a listener
		$table.on('click', 'i[data-toggle]', function() {
			var $this = $(this),
				tr = $(this).closest( 'tr' ).get(0);

			if ( datatable.fnIsOpen(tr) ) {
				$this.removeClass( 'fa-minus-square-o' ).addClass( 'fa-plus-square-o' );
				datatable.fnClose( tr );
			} else {
				$this.removeClass( 'fa-plus-square-o' ).addClass( 'fa-minus-square-o' );
				datatable.fnOpen( tr, fnFormatDetails( datatable, tr), 'details' );
			}
		});
	};

	$(function() {
		datatableInit();
	});

}).apply( this, [ jQuery ]);