/*
 * Flot Charts
 */
(function( $ ) {

	'use strict';

	/* Flot: Basic */
	(function() {
		var plot = $.plot('#flotBasic', flotBasicData, {
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
					show: true
				},
				shadowSize: 0
			},
			grid: {
				hoverable: true,
				clickable: true,
				borderColor: '#EDEDED',
				borderWidth: 1,
				labelMargin: 15,
				backgroundColor: '#FFF'
			},
			yaxis: {
				min: 0,
				max: 200,
				color: '#EDEDED'
			},
			xaxis: {
				color: '#EDEDED'
			},
			tooltip: true,
			tooltipOpts: {
				content: '%s: Value of %x is %y',
				shifts: {
					x: -60,
					y: 25
				},
				defaultTheme: false
			}
		});
	})();

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

	/* Flot: Bars */
	(function() {
		var plot = $.plot('#flotBars', [flotBarsData], {
			colors: ['#4D99E0'],
			series: {
				bars: {
					show: true,
					barWidth: 0.8,
					align: 'center'
				}
			},
			xaxis: {
				mode: 'categories',
				tickLength: 0
			},
			grid: {
				hoverable: true,
				clickable: true,
				borderColor: '#EDEDED',
				borderWidth: 1,
				labelMargin: 15,
				backgroundColor: '#FFF'
			},
			tooltip: true,
			tooltipOpts: {
				content: '%y',
				shifts: {
					x: -10,
					y: 20
				},
				defaultTheme: false
			}
		});
	})();

	/* Flot: Pie */
	(function() {
		var plot = $.plot('#flotPie', flotPieData, {
			series: {
				pie: {
					show: true,
					combine: {
						color: '#999',
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		});
	})();

}).apply( this, [ jQuery ]);

/*
 * Gauge
 */
(function( $ ) {

	'use strict';
	
	/* Gauge: Basic */
	(function() {
		var target = $('#gaugeBasic'),
			opts = $.extend(true, {}, {
				lines: 12, // The number of lines to draw
				angle: 0.12, // The length of each line
				lineWidth: 0.5, // The line thickness
				pointer: {
					length: 0.7, // The radius of the inner circle
					strokeWidth: 0.05, // The rotation offset
					color: '#444' // Fill color
				},
				limitMax: 'true', // If true, the pointer will not go past the end of the gauge
				colorStart: '#4D99E0', // Colors
				colorStop: '#4D99E0', // just experiment with them
				strokeColor: '#dfdfdf', // to see which ones work best for you
				generateGradient: true
			}, target.data('plugin-options'));

			var gauge = new Gauge(target.get(0)).setOptions(opts);

		gauge.maxValue = opts.maxValue; // set max gauge value
		gauge.animationSpeed = 32; // set animation speed (32 is default value)
		gauge.set(opts.value); // set actual value
		gauge.setTextField(document.getElementById("gaugeBasicTextfield"));
	})();

	/* Gauge: Alternative */
	(function() {
		var target = $('#gaugeAlternative'),
			opts = $.extend(true, {}, {
				lines: 12, // The number of lines to draw
				angle: 0.12, // The length of each line
				lineWidth: 0.5, // The line thickness
				pointer: {
					length: 0.7, // The radius of the inner circle
					strokeWidth: 0.05, // The rotation offset
					color: '#444' // Fill color
				},
				limitMax: 'true', // If true, the pointer will not go past the end of the gauge
				colorStart: '#99bb12', // Colors
				colorStop: '#99bb12', // just experiment with them
				strokeColor: '#dfdfdf', // to see which ones work best for you
				generateGradient: true
			}, target.data('plugin-options'));

			var gauge = new Gauge(target.get(0)).setOptions(opts);

		gauge.maxValue = opts.maxValue; // set max gauge value
		gauge.animationSpeed = 32; // set animation speed (32 is default value)
		gauge.set(opts.value); // set actual value
		gauge.setTextField(document.getElementById("gaugeAlternativeTextfield"));
	})();
	
}).apply( this, [ jQuery ]);

/*
 * Sparkline
 */
(function( $ ) {

	'use strict';
	
	/* Sparkline: Line */
	$("#sparklineLine").sparkline(sparklineLineData, {
		type: 'line',
		width: '80',
		height: '30',
		lineColor: '#4D99E0'
	});

	/* Sparkline: Bar */
	$("#sparklineBar").sparkline(sparklineBarData, {
		type: 'bar',
		width: '80',
		height: '30',
		barColor: '#4D99E0',
		negBarColor: '#A31905'
	});

	/* Sparkline: Tristate */
	$("#sparklineTristate").sparkline(sparklineTristateData, {
		type: 'tristate',
		width: '80',
		height: '30',
		posBarColor: '#4D99E0',
		negBarColor: '#A31905'
	});

	/* Sparkline: Discrete */
	$("#sparklineDiscrete").sparkline(sparklineDiscreteData, {
		type: 'discrete',
		width: '80',
		height: '30',
		lineColor: '#4D99E0'
	});

	/* Sparkline: Bullet */
	$("#sparklineBullet").sparkline(sparklineBulletData, {
		type: 'bullet',
		width: '80',
		height: '30',
		targetColor: '#FC730A',
		performanceColor: '#4D99E0'
	});

	/* Sparkline: Pie */
	$("#sparklinePie").sparkline(sparklinePieData, {
		type: 'pie',
		height: '30',
		barColor: '#4D99E0'
	});
	
}).apply( this, [ jQuery ]);