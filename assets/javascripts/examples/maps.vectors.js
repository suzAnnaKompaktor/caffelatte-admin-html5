(function( $ ) {

	'use strict';

	var vMap = function( $element, options ) {
		var defaults = {
			map: 'world_en',
			backgroundColor: null,
			borderColor: '#818181',
    		borderOpacity: 0.25,
			color: '#FFFFFF',
			hoverOpacity: 0.85,
			selectedColor: '#0E3253',
			enableZoom: true,
			borderWidth:1,
			showTooltip: true,
			values: sample_data,
			scaleColors: ['#4D99E0', '#2580D5'],
			normalizeFunction: 'polynomial'
		};

		$element.vectorMap( $.extend( defaults, options ) );
	};

	$(function() {
		$( '[data-vector-map]' ).each(function() {
			var $this = $(this);
			vMap( $this, ($this.data( 'plugin-options' ) || {}) );
		});
	});

}).apply( this, [ jQuery ]);