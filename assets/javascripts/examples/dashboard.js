(function( $ ) {

	'use strict';
	
	/* Timeline thumbnail */
	$('.timeline .thumbnail-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
			}
	});
	
	/* Flot: Real-Time */
	(function() {
		var data = [],
			totalPoints = 300;

		function getRandomData() {

			if (data.length > 0)
				data = data.slice(1);

			// Do a random walk
			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}

				data.push(y);
			}

			// Zip the generated y values with the x values
			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]]);
			}

			return res;
		}

		var plot = $.plot('#flotRealTime', [getRandomData()], {
			colors: ['#4D99E0'],
			series: {
				lines: {
					show: true,
					fill: true,
					lineWidth: 1,
					fillColor: {
						colors: [{
							opacity: 0.45
						}, {
							opacity: 0.45
						}]
					}
				},
				points: {
					show: false
				},
				shadowSize: 0
			},
			grid: {
				borderColor: '#EDEDED',
				borderWidth: 1,
				labelMargin: 15,
				backgroundColor: '#FFF'
			},
			yaxis: {
				min: 0,
				max: 100,
				color: '#EDEDED'
			},
			xaxis: {
				show: false
			}
		});

		function update() {

			plot.setData([getRandomData()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()
			plot.draw();
			setTimeout(update, $( 'html' ).hasClass( 'mobile-device' ) ? 1000 : 30 );
		}

		update();
	})();
	
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
	
	/* Sparkline: Line */
	var sparklineLineDashOptions = {
		type: 'line',
		width: '80',
		height: '55',
		lineColor: '#DFDFDF'
	};

	$("#sparklineLineDash").sparkline(sparklineLineDashData, sparklineLineDashOptions);

	
	/* Sparkline: Bar */
	var sparklineBarDashOptions = {
		type: 'bar',
		width: '80',
		height: '55',
		barColor: '#DFDFDF',
		negBarColor: '#FC730A'
	};

	$("#sparklineBarDash").sparkline(sparklineBarDashData, sparklineBarDashOptions);

	/* Map */
	var mapDefaults = {
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

	$('#vectorWorldMap').vectorMap(mapDefaults);

}).apply( this, [ jQuery ]);