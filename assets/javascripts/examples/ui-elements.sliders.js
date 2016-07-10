(function() {
	$('#listenSlider').change(function() {
		$('.output strong').text( this.value );
	});

	$('#listenSlider2').change(function() {
		var min = parseInt(this.value.split('/')[0], 10);
		var max = parseInt(this.value.split('/')[1], 10);

		$('.output2 strong.min').text( min );
		$('.output2 strong.max').text( max );
	});
})();