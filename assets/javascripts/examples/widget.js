(function( $ ) {

	'use strict';

	$(function() {

		/* Flot */
		var plot = $.plot('#flotWidgetsSales1', flotWidgetsSales1Data, {
			series: {
				lines: {
					show: true,
					lineWidth: 2
				},
				points: {
					show: true
				},
				shadowSize: 0
			},
			grid: {
				hoverable: true,
				clickable: true,
				borderColor: 'transparent',
				borderWidth: 1,
				labelMargin: 15,
				backgroundColor: 'transparent'
			},
			yaxis: {
				min: 0,
				color: 'transparent'
			},
			xaxis: {
				mode: 'categories',
				color: 'transparent'
			},
			legend: {
				show: false
			},
			tooltip: true,
			tooltipOpts: {
				content: '%x: %y',
				shifts: {
					x: -30,
					y: 25
				},
				defaultTheme: false
			}
		});

	});

}).apply(this, [ jQuery ]);