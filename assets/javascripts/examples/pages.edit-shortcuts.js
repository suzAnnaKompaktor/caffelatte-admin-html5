(function( $ ) {
	
	'use strict';
	
	$(function() {
		EditableTable.init('#editShortcuts');
	});
	
	var EditableTable = {
		
		options: {
			addButton: '#addRow',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm',
			}
		},
		
		$table: false,
		
		init: function(element){
			this.$table   = $(element);
			this.$addButton  = $( this.options.addButton );
			
			this.setDialog();
			this.build();
			this.events();
		},
		
		setDialog: function() {
			this.dialog				= {};
			this.dialog.$wrapper	= $( this.options.dialog.wrapper );
			this.dialog.$cancel		= $( this.options.dialog.cancelButton );
			this.dialog.$confirm	= $( this.options.dialog.confirmButton );

			return this;
		},
		
		build: function() {
			this.datatable = this.$table.dataTable({
				aoColumns: [
					null,
					null,
					{ "bSortable": false }
				]
			});

			return this;
		},

		events: function() {
			var _self      = this;
			var btnSave    =  'a.row-save';
			var btnCancel  =  'a.row-cancel';
			var btnEdit    =  'a.row-edit';
			var btnRemove  =  'a.row-remove';

			this.$table
				.on('click', btnSave, function( e ) {
					e.preventDefault();

					_self.rowSave( $(this).closest( 'tr' ) );
				})
				.on('click', btnCancel, function( e ) {
					e.preventDefault();

					_self.rowCancel( $(this).closest( 'tr' ) );
				})
				.on('click', btnEdit, function( e ) {
					e.preventDefault();

					_self.rowEdit( $(this).closest( 'tr' ) );
				})
				.on( 'click', btnRemove, function( e ) {
					e.preventDefault();

					var $row = $(this).closest( 'tr' );

					$.magnificPopup.open({
						items: {
							src: '#dialog',
							type: 'inline'
						},
						preloader: false,
						modal: true,
						callbacks: {
							change: function() {
								_self.dialog.$confirm.on( 'click', function( e ) {
									e.preventDefault();

									_self.rowRemove( $row );
									$.magnificPopup.close();
								});
							},
							close: function() {
								_self.dialog.$confirm.off( 'click' );
							}
						}
					});
				});

			this.$addButton.on( 'click', function(e) {
				e.preventDefault();

				_self.rowAdd();
			});

			this.dialog.$cancel.on( 'click', function( e ) {
				e.preventDefault();
				$.magnificPopup.close();
			});

			return this;
		},
		
		rowAdd: function() {
			this.datatable.fnSort([ [0,'asc'] ]); // always show fields

			this.$addButton.attr({ 'disabled': 'disabled' });

			var actions,
				data,
				$row;

			actions = [
				'<a href="#" class="row-save hidden state-edit alt-link"><i class="fa fa-save"></i></a>',
				'<a href="#" class="row-cancel hidden state-edit alt-link"><i class="fa fa-times"></i></a>',
				'<a href="#" class="row-edit state-default alt-link"><i class="fa fa-pencil"></i></a>',
				'<a href="#" class="row-remove state-default alt-link"><i class="fa fa-trash-o"></i></a>'
			].join(' ');

			data = this.datatable.fnAddData([ '', '', actions ]);
			$row = $( this.datatable.fnGetNodes( data[0] ) );

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
		},
		
		rowCancel: function( $row ) {
			var _self = this,
				i,
				data;

			if ( $row.hasClass('adding') ) {
				this.rowRemove( $row );
			} else {

				data = this.datatable.fnGetData( $row.get(0) );

				$row.find( 'td' ).each(function( i ) {
					var $this = $( this );

					if ( !$this.hasClass( 'actions' ) ) {
						_self.datatable.fnUpdate( data[ i ], $row.get(0), i, false );
					} else {
						_self.rowSetActionsDefault( $row );
					}
				});

				this.datatable.fnDraw();
			}
		},

		rowEdit: function( $row ) {
			var _self = this;
			var data = this.datatable.fnGetData( $row.get(0) );

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					_self.rowSetActionsEditing( $row );
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},
		
		rowSave: function( $row ) {
			var _self = this;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}
			
			var values = [];
			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( !$this.hasClass('actions') ) {
					values[i] = $.trim($( this ).find( 'input' ).val());
				} else {
					_self.rowSetActionsDefault( $row );
					values[i] =  $( this ).html();
				}
			});
			this.datatable.fnUpdate(values, $row.get(0));
			this.datatable.fnDraw();
		},
		
		
		rowRemove: function( $row ) {
			if ( $row.hasClass('adding') ) {
				this.$addButton.removeAttr( 'disabled' );
			}

			this.datatable.fnDeleteRow( $row.get(0) );
		},

		rowSetActionsEditing: function( $row ) {
			$row.find( '.state-edit' ).removeClass( 'hidden' );
			$row.find( '.state-default' ).addClass( 'hidden' );
		},

		rowSetActionsDefault: function( $row ) {
			$row.find( '.state-edit' ).addClass( 'hidden' );
			$row.find( '.state-default' ).removeClass( 'hidden' );
		}
		
	};

}).apply( this, [ jQuery ]);