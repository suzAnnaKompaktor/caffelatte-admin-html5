(function( $ ) {

	'use strict';
	
	$(function() {

		mapBasic();
		mapMarkers();
		mapStatic();
		mapContextMenu();
		mapGeocoding();
		mapStreetView();

	});

	var mapBasic = function() {
		new GMaps({
			div: '#gmapBasic',
			lat: -12.043333,
			lng: -77.028333
		});
	};

	var mapMarkers = function() {
		var map = new GMaps({
			div: '#gmapMarkers',
			lat: -12.043333,
			lng: -77.028333
		});

		map.addMarker({
			lat: -12.043333,
  			lng: -77.028333,
  			title: 'Lima',
			infoWindow: {
				content: '<p>Example</p>'
			}
		});
	};

	var mapStatic = function() {
		var url = GMaps.staticMapURL({
			size: [725, 500],
			lat: -12.043333,
			lng: -77.028333,
			scale: 1
		});

		$('#gmapStatic')
			.css({
				backgroundImage: 'url(' + url + ')',
				backgroundSize: 'cover'
			});
	};

	var mapContextMenu = function() {
		var map = new GMaps({
			div: '#gmapContextMenu',
			lat: -12.043333,
			lng: -77.028333
		});

		map.setContextMenu({
			control: 'map',
			options: [
				{
					title: 'Add marker',
					name: 'add_marker',
					action: function(e) {
						this.addMarker({
							lat: e.latLng.lat(),
							lng: e.latLng.lng(),
							title: 'New marker'
						});
					}
				},
				{
					title: 'Center here',
					name: 'center_here',
					action: function(e) {
						this.setCenter(e.latLng.lat(), e.latLng.lng());
					}
				}
			]
		});
	};
	
	var mapGeocoding = function() {
		var map = GMaps({
			el: '#gmapGeocoding',
			lat : 48.85844,
			lng : 2.294514
		});
		
		 $('#geocodingForm').submit(function(e){
	        e.preventDefault();
	        GMaps.geocode({
	          address: $('#address').val().trim(),
	          callback: function(results, status){
	            if(status=='OK'){
	              var latlng = results[0].geometry.location;
	              map.setCenter(latlng.lat(), latlng.lng());
	              map.addMarker({
	                lat: latlng.lat(),
	                lng: latlng.lng()
	              });
	            }
	          }
	        });
	      });
	};

	var mapStreetView = function() {
		var gmap = GMaps.createPanorama({
			el: '#gmapStreetView',
			lat : 48.85844,
			lng : 2.294514
		});

	};

}).apply(this, [ jQuery ]);