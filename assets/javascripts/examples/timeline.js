(function( $ ) {

	'use strict';
	
	$(function() {
		initLightbox();
		initGoogleMaps();
	});

	var initLightbox = function() {
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
	};

	var initGoogleMaps = function() {
		var lat = 51.501364,
			lng = -0.14189,
			content = '<p>Buckingham Palace</p>';
		
		var map = new GMaps({
			div: '#gmapCheckIn',
			lat: lat,
			lng: lng,
			markers: [{
				lat: lat,
				lng: lng,
				infoWindow: {
					content: content
				}
			}],
			scrollwheel: false
		});

		map.addMarker({
			lat: lat,
			lng: lng,
			infoWindow: {
				content: content
			}
		});
	};

}).apply(this, [ jQuery ]);