(function( $ ) {

	'use strict';

	/* Wizard #1 */
	var $w1 = $('#wizard01');
	var $w1Form = $w1.find('form');
	var $w1finish = $w1.find('ul.pager li.finish'),
		$w1validator = $w1Form.validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
			$(element).remove();
		},
		errorPlacement: function( error, element ) {
			element.parent().append( error );
		}
	});

	$w1finish.on('click', function( ev ) {
		ev.preventDefault();
		var validated = $w1Form.valid();
		if ( validated ) {
			var ib = $('<div/>').infobar({
				content: 'Congratulations! You completed the wizard form.',
				type: 'notification',
				style: 'success',
				icon: 'fa-check',
				delay: 2000,
				trigger: 'manual',
				visibleByDefault: 'true'
			});
		
			ib.infobar('show');
		}
	});

	$w1.bootstrapWizard({
		tabClass: 'wizard-steps',
		nextSelector: 'ul.pager li.next',
		previousSelector: 'ul.pager li.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function( tab, navigation, index, newindex ) {
			var validated = $w1Form.valid();
			if( !validated ) {
				$w1validator.focusInvalid();
				return false;
			}
		},
		onTabClick: function( tab, navigation, index, newindex ) {
			if ( newindex == index + 1 ) {
				return this.onNext( tab, navigation, index, newindex);
			} else if ( newindex > index + 1 ) {
				return false;
			} else {
				return true;
			}
		},
		onTabChange: function( tab, navigation, index, newindex ) {
			var totalTabs = navigation.find('li').size() - 1;
			$w1finish[ newindex != totalTabs ? 'addClass' : 'removeClass' ]( 'hidden' );
			$w1.find(this.nextSelector)[ newindex == totalTabs ? 'addClass' : 'removeClass' ]( 'hidden' );
		}
	});

	/* Wizard #2 */
	var $w2 = $('#wizard02');
	var $w2Form = $w2.find('form');
	var $w2finish = $w2.find('ul.pager li.finish'),
		$w2validator = $w2Form.validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
			$(element).remove();
		},
		errorPlacement: function( error, element ) {
			element.parent().append( error );
		}
	});

	$w2finish.on('click', function( ev ) {
		ev.preventDefault();
		var validated = $w2Form.valid();
		if ( validated ) {
			var ib = $('<div/>').infobar({
				content: 'Congratulations! You completed the wizard form.',
				type: 'notification',
				style: 'success',
				icon: 'fa-check',
				delay: 2000,
				trigger: 'manual',
				visibleByDefault: 'true'
			});
		
			ib.infobar('show');
		}
	});

	$w2.bootstrapWizard({
		tabClass: 'wizard-steps',
		nextSelector: 'ul.pager li.next',
		previousSelector: 'ul.pager li.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function( tab, navigation, index, newindex ) {
			var validated = $w2Form.valid();
			if( !validated ) {
				$w2validator.focusInvalid();
				return false;
			}
		},
		onTabClick: function( tab, navigation, index, newindex ) {
			if ( newindex == index + 1 ) {
				return this.onNext( tab, navigation, index, newindex);
			} else if ( newindex > index + 1 ) {
				return false;
			} else {
				return true;
			}
		},
		onTabChange: function( tab, navigation, index, newindex ) {
			var totalTabs = navigation.find('li').size() - 1;
			$w2finish[ newindex != totalTabs ? 'addClass' : 'removeClass' ]( 'hidden' );
			$w2.find(this.nextSelector)[ newindex == totalTabs ? 'addClass' : 'removeClass' ]( 'hidden' );
		}
	});

	/* Wizard #3 */
	var $w3 = $('#wizard03');
	var $w3Form = $w3.find('form');
	var $w3finish = $w3.find('ul.pager li.finish'),
		$w3validator = $w3Form.validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
			$(element).remove();
		},
		errorPlacement: function( error, element ) {
			element.parent().append( error );
		}
	});

	$w3finish.on('click', function( ev ) {
		ev.preventDefault();
		var validated = $w3Form.valid();
		if ( validated ) {
			var ib = $('<div/>').infobar({
				content: 'Congratulations! You completed the wizard form.',
				type: 'notification',
				style: 'success',
				icon: 'fa-check',
				delay: 2000,
				trigger: 'manual',
				visibleByDefault: 'true'
			});
		
			ib.infobar('show');
		}
	});

	$w3.bootstrapWizard({
		tabClass: 'wizard-steps',
		nextSelector: 'ul.pager li.next',
		previousSelector: 'ul.pager li.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function( tab, navigation, index, newindex ) {
			var validated = $w3Form.valid();
			if( !validated ) {
				$w3validator.focusInvalid();
				return false;
			}
		},
		onTabClick: function( tab, navigation, index, newindex ) {
			if ( newindex == index + 1 ) {
				return this.onNext( tab, navigation, index, newindex);
			} else if ( newindex > index + 1 ) {
				return false;
			} else {
				return true;
			}
		},
		onTabChange: function( tab, navigation, index, newindex ) {
			var $total = navigation.find('li').size() - 1;
			$w3finish[ newindex != $total ? 'addClass' : 'removeClass' ]( 'hidden' );
			$w3.find(this.nextSelector)[ newindex == $total ? 'addClass' : 'removeClass' ]( 'hidden' );
		},
		onTabShow: function( tab, navigation, index ) {
			var $total = navigation.find('li').length - 1;
			var $current = index;
			var $percent = Math.floor(( $current / $total ) * 100);
			$w3.find('.progress-indicator').css({ 'width': $percent + '%' });
			tab.prevAll().addClass('completed');
			tab.nextAll().removeClass('completed');
		}
	});

	/* Wizard #4 */
	var $w4 = $('#wizard04');
	var $w4Form = $w4.find('form');
	var $w4finish = $w4.find('ul.pager li.finish'),
		$w4validator = $w4Form.validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
			$(element).remove();
		},
		errorPlacement: function( error, element ) {
			element.parent().append( error );
		}
	});

	$w4finish.on('click', function( ev ) {
		ev.preventDefault();
		var validated = $w4Form.valid();
		if ( validated ) {
			var ib = $('<div/>').infobar({
				content: 'Congratulations! You completed the wizard form.',
				type: 'notification',
				style: 'success',
				icon: 'fa-check',
				delay: 2000,
				trigger: 'manual',
				visibleByDefault: 'true'
			});
		
			ib.infobar('show');
		}
	});

	$w4.bootstrapWizard({
		tabClass: 'wizard-steps',
		nextSelector: 'ul.pager li.next',
		previousSelector: 'ul.pager li.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function( tab, navigation, index, newindex ) {
			var validated = $w4Form.valid();
			if( !validated ) {
				$w4validator.focusInvalid();
				return false;
			}
		},
		onTabClick: function( tab, navigation, index, newindex ) {
			if ( newindex == index + 1 ) {
				return this.onNext( tab, navigation, index, newindex);
			} else if ( newindex > index + 1 ) {
				return false;
			} else {
				return true;
			}
		},
		onTabChange: function( tab, navigation, index, newindex ) {
			var $total = navigation.find('li').size() - 1;
			$w4finish[ newindex != $total ? 'addClass' : 'removeClass' ]( 'hidden' );
			$w4.find(this.nextSelector)[ newindex == $total ? 'addClass' : 'removeClass' ]( 'hidden' );
		},
		onTabShow: function( tab, navigation, index ) {
			var $total = navigation.find('li').length - 1;
			var $current = index;
			var $percent = Math.floor(( $current / $total ) * 100);
			$w4.find('.progress-indicator').css({ 'width': $percent + '%' });
			tab.prevAll().addClass('completed');
			tab.nextAll().removeClass('completed');
		}
	});

	/* Wizard #5 */
	var $w5 = $('#wizard05');
	var $w5Form = $w5.find('form');
	var $w5finish = $w5.find('ul.pager li.finish'),
		$w5validator = $w5Form.validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
			$(element).remove();
		},
		errorPlacement: function( error, element ) {
			element.parent().append( error );
		}
	});

	$w5finish.on('click', function( ev ) {
		ev.preventDefault();
		var validated = $w5Form.valid();
		if ( validated ) {
			var ib = $('<div/>').infobar({
				content: 'Congratulations! You completed the wizard form.',
				type: 'notification',
				style: 'success',
				icon: 'fa-check',
				delay: 2000,
				trigger: 'manual',
				visibleByDefault: 'true'
			});
		
			ib.infobar('show');
		}
	});

	$w5.bootstrapWizard({
		tabClass: 'wizard-steps',
		nextSelector: 'ul.pager li.next',
		previousSelector: 'ul.pager li.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function( tab, navigation, index, newindex ) {
			var validated = $w5Form.valid();
			if( !validated ) {
				$w5validator.focusInvalid();
				return false;
			}
		},
		onTabChange: function( tab, navigation, index, newindex ) {
			var $total = navigation.find('li').size() - 1;
			$w5finish[ newindex != $total ? 'addClass' : 'removeClass' ]( 'hidden' );
			$w5.find(this.nextSelector)[ newindex == $total ? 'addClass' : 'removeClass' ]( 'hidden' );
		},
		onTabShow: function( tab, navigation, index ) {
			var $total = navigation.find('li').length;
			var $current = index + 1;
			var $percent = ( $current / $total ) * 100;
			$w5.find('.progress-bar').css({ 'width': $percent + '%' });
		}
	});

}).apply( this, [ jQuery ]);