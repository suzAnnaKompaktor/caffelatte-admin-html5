(function( $ ) {

	/* Thumbnail: Select */
	$('.mg-option input[type=checkbox]').on('change', function( ev ) {
		var $thumbnail = $(this).parents('.thumbnail');
		if($(this).is(':checked')) {
			$thumbnail.addClass('thumbnail-selected');
		} else {
			$thumbnail.removeClass('thumbnail-selected');
		}
	});

	$('.mg-option input[type=checkbox]:checked').trigger('change');

	/* Toolbar: Select All */
	$('#mgSelectAll').on('click', function( e ) {
		e.preventDefault();
		var $this = $(this),
			$label = $this.find('> span');
			$checks = $('.mg-option input[type=checkbox]');

		if($this.attr('data-all-selected')) {
			$this.removeAttr('data-all-selected');
			$checks.prop('checked', false).trigger('change');
			$label.html($label.data('all-text'));
		} else {
			$this.attr('data-all-selected', 'true');
			$checks.prop('checked', true).trigger('change');
			$label.html($label.data('none-text'));
		}
	});

	/* Image Preview: Lightbox */
	$('a.thumb-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
	});

	$('.thumb-preview .mg-zoom').on('click.lightbox', function( ev ) {
		ev.preventDefault();
		$(this).closest('.thumb-preview').find('a.thumb-image').triggerHandler('click');
	});

	/* Thumnail: Dropdown Options */
	$('.thumbnail').on('mouseenter', function() {
		var $mgToggle = $(this).find('.mg-toggle');
		if ( $mgToggle.parent().hasClass('open') ) {
			$mgToggle.dropdown('toggle');
		}
	});

	/* Isotope: Sort Thumbnails */
	$("[data-sort-source]").each(function() {

		var source = $(this);
		var destination = $("[data-sort-destination][data-sort-id=" + $(this).attr("data-sort-id") + "]");

		if(destination.get(0)) {

			$(window).load(function() {

				destination.isotope({
					itemSelector: '.media-gallery-item',
					layoutMode: 'fitRows'
				});
				
				$(window).on('resize sidebar-right-toggled sidebar-left-toggled', function() {
					destination.isotope();
				});

				source.find("a[data-option-value]").click(function(e) {

					e.preventDefault();

					var $this = $(this),
						filter = $this.attr("data-option-value");

					source.find(".active").removeClass("active");
					$this.addClass("active");

					destination.isotope({
						filter: filter
					});

					if(window.location.hash != "" || filter.replace(".","") != "*") {
						window.location.hash = filter.replace(".","");
					}

					return false;

				});

				$(window).bind("hashchange", function(e) {

					var hashFilter = "." + location.hash.replace("#",""),
						hash = (hashFilter == "." || hashFilter == ".*" ? "*" : hashFilter);

					source.find(".active").removeClass("active");
					source.find("[data-option-value='" + hash + "']").addClass("active");

					destination.isotope({
						filter: hash
					});

				});

				var hashFilter = "." + (location.hash.replace("#","") || "*");

				var initFilterEl = source.find("li[data-option-value='" + hashFilter + "'] a");

				if(initFilterEl.get(0)) {
					source.find("[data-option-value='" + hashFilter + "']").click();
				} else {
					source.find("a:first-child").click();
				}

			});

		}

	});

}(jQuery));