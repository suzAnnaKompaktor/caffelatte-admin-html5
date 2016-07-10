window.theme = {};
window.screenXs = 480;
window.screenSm = 768;
window.screenMd = 992;
window.instPrefix = '__';

//Check overflow
(function( $ ) {

	'use strict';
	
	$.fn.hasOverflow = function() {
	    var $el = $(this);
    	var $children = $el.children();
    	var len = $children.length;
    	var result = false;

    	if (len) {
    		var elementOuterHeight = $el.outerHeight(true);
    		var elementHeight = $el.height();
    		var maxHeight = 15;
    		if(!$(this).is(":visible")){
	    		var fakeEl = $(this).clone();
	  			fakeEl.css({
        			position:   'absolute', 
        			visibility: 'visible',
        			display:    'block'
    			});
     			$("body").append(fakeEl);
     			elementOuterHeight = fakeEl.outerHeight(true);
     			elementHeight = fakeEl.height();
     			$children = fakeEl.children();
     			$children.each(function(){
            		maxHeight += $(this).height();
        		});
     			fakeEl.remove();
	    	}else{
	    		$children.each(function(){
            		maxHeight += $(this).height();
        		});
	    	}
        	result = maxHeight > elementHeight;
    	}
    	
    	return result;
	};
	
})( jQuery );

// Check element overflow
(function( $ ) {

	'use strict';
	
	$.fn.hasElementOverflow = function(parent) {
		var $this = $(this);
		var elementsWidth = 0;
		parent.children().each(function(){
  			elementsWidth += $(this).outerWidth();
		});
					
		if(elementsWidth > parent.width()){
			return true;
		}else{
			return false;
		}
	};
	
})( jQuery );

// Text fit
(function( $ ) {

	'use strict';
	
	$.fn.getTextThatFits = function(w) {
		var $this	 = $(this);
		var w		 = w || $this.width(),
			txt  	 = $this.text(),
			fSize	 = $this.css( "font-size" ),
			fName 	 = $this.css( "font-family" ),
			fWeight  = $this.css( "font-weight" );
			
    			if (fWeight === undefined)
        			fWeight = "normal";

    			var auxDiv = $("<div>").addClass("auxdiv").css ({
        			fontFamily : fName,
        			fontSize : fSize,
        			position: "absolute",
        			height: "auto",
        			marginLeft : "-1000px",
        			marginTop : "-1000px",
        			fontWeight: fWeight,
        			width: "auto"
    			})
    			.appendTo($("body"))
    			.html(txt);

    			var ww = (auxDiv.width() + 1);
    			var str = txt;

    			if (ww > w){
        			var i = 1, p = 1, u = txt.length, sol = 0;

        			while (p <= u){
            			i = (p + u) >> 1;
            			str = txt.slice(0, i);
            			auxDiv.html(str);
            			ww = (auxDiv.width() + 1);
            			if (ww <= w) {
                			sol = i;
                			p = i + 1;
            			}
            			else u = i - 1;
        			}

        			str = txt.slice(0, sol);
    			}
    			$(".auxdiv").remove();
    			auxDiv.remove();
    			return str.length;
	};
	
})( jQuery );

//Add nano scroller
(function( $ ) {

	'use strict';
	
	$.fn.addScroller = function() {
	    var $this = $(this);
    	if($this.hasOverflow()){
    		$this.wrapInner('<div class="nano"><div class="nano-content">');
    	}
	};
	
})( jQuery );

//Error page animation
(function( $ ) {

	'use strict';
	
	setTimeout(function(){
		$('.error-page-title i').addClass('animated hinge');
	}, 1500);
	
}).apply(this, [ jQuery ]);

// User Menu
(function( $ ) {

	'use strict';
	
	var $element = $( '.user-menu' );
	var $parent = $( '.inner-header' );
	var $button = $element.find( '> li > a' ),
		$submenu = $element.find( '> li > ul' );
			
	// Create dropdown menu from user menu
	function collapse() {
		if($element.hasClass('inline-menu')){
			$element.removeClass('inline-menu');
			$submenu.addClass('dropdown-menu');
			$button.attr('data-toggle', 'dropdown');
			$button.children('i.fa').removeClass('visible-xs');
			$submenu.children('li:first').removeClass('visible-xs');
		}
	};
			
	// Expand user menu
	function expand() {
		if(!$element.hasClass('inline-menu')){
			$element.addClass('inline-menu');
			$submenu.removeClass('dropdown-menu');
			$button.removeAttr('data-toggle');
			$button.children('i.fa').addClass('visible-xs');
			$submenu.children('li:first').addClass('visible-xs');
		}
	};
	
	// Toggle collapse
	function build(){
		var hasOverflow = $.fn.hasElementOverflow($parent);
		
		if(hasOverflow){
			collapse();
		}else{
			expand();
		}
		
		if ($(window).width() <= window.screenSm) {
			collapse();
		}
	}
	
	$(window).on('resize', function(){
		build();
	});
	
	build();

}).apply( this, [ jQuery ]);

// Shortcuts Menu
(function( $ ) {

	'use strict';
	
	var $element = $( '.shortcuts-menu' );
	var $parent = $( '.top-section' );
	var $menu = $element.find( '> li > ul'),
		$button = $element.find( '> li > a'),
		$edit = $element.find( 'a.edit-shortcuts');
			
	// Create dropdown menu from shortcuts menu
	function collapse() {
		if($menu.hasClass('inline-menu')){
			$menu.removeClass('inline-menu').addClass('dropdown-menu');
			$button.removeClass('visible-xs');
			$edit.removeClass('hidden-xs');
			$edit.removeClass('hidden-sm');
		}
	};
			
	// Expand user menu
	function expand() {
		if(!$menu.hasClass('inline-menu')){
			$menu.addClass('inline-menu').removeClass('dropdown-menu');
			$button.addClass('visible-xs');
			$edit.addClass('hidden-xs');
			$edit.addClass('hidden-sm');
		}
	};
	
	// Toggle collapse
	function build(){
		var hasOverflow = $.fn.hasElementOverflow($parent);
		
		if(hasOverflow){
			collapse();
		}else{
			expand();
		}
		
		if ($(window).width() <= window.screenSm) {
			collapse();
		}
	}
	
	$(window).on('resize', function(){
		build();
	});
	
	build();

}).apply( this, [ jQuery ]);


// Main Navigation
(function( $ ) {

	'use strict';

	var $items = $( '.main-nav > li.nav-parent' );

	function expand( li ) {
		li.children( 'ul.nav-children' ).slideDown( 'fast', function() {
			li.addClass( 'nav-expanded' );
			$(this).css( 'display', '' );
		});
	}

	function collapse( li ) {
		li.children('ul.nav-children' ).slideUp( 'fast', function() {
			$(this).css( 'display', '' );
			li.removeClass( 'nav-expanded' );
		});
	}

	$items.on('click', function() {
		var prev = $( '.main-nav > li.nav-expanded' ),
			next = $( this );

		if ( prev.get( 0 ) !== next.get( 0 ) ) {
			collapse( prev );
			expand( next );
		} else {
			collapse( prev );
		}
		
		$(window).trigger( 'navigation-toggled' );
	});
	
	// Add padding for collapsed items
	$items.on('mouseenter', function(){
		if($('html').hasClass('sidebar-left-collapsed')){
			$( this ).next('li').addClass('prev-active');
		}
	}).on('mouseleave', function(){
		if($('html').hasClass('sidebar-left-collapsed')){
			$( this ).next('li').removeClass('prev-active');
		}
	});

	$items.find('.nav-children a').on( 'click', function( e ) {
		e.stopPropagation();
	});

}).apply( this, [ jQuery ]);

// Secondary Nav
(function( $ ) {

	'use strict';
	var $contentBody = $('.content-body');
	var isFixed = $('html').hasClass('fixed');
	var offset = 10;
	if($contentBody.length && isFixed){
		offset = $contentBody.offset().top + 10;
	}

	if ( $.isFunction( $.fn['scrollspy'] ) ) {
		$('body').scrollspy({ 
			target: '.secondary-nav',
			offset: offset + 10
		});
	}

	$('.secondary-nav li a').click(function(event) {
    	event.preventDefault();
    	$($(this).attr('href'))[0].scrollIntoView();
    	scrollBy(0, -offset);
	});
	
	if($.isFunction( $.fn['affix'] ) && !isFixed){
		$('.secondary-nav').affix({
			offset: { x: 20 }
		});
	}

}).apply( this, [ jQuery ]);

// Skeleton
(function(theme, $) {

	'use strict';

	theme = theme || {};
	
	var $window		= $( window ),
		$html		= $( 'html' ),
		isAndroid	= navigator.userAgent.toLowerCase().indexOf('android') > -1;

	// mobile devices with fixed has a lot of issues when focus inputs and others...
	if ( typeof $.browser !== 'undefined' && $.browser.mobile && $html.hasClass('fixed') ) {
		$html.removeClass( 'fixed' ).addClass( 'scroll' );
	}
	
	var Skeleton = {
		
		customScroll: ( !Modernizr.overflowscrolling && !isAndroid && $.fn.nanoScroller !== 'undefined') && !$html.hasClass('scroll'),
		
		initialize: function() {
			this.setVars();
			this.buildMenuBar();
			this.buildInfoBar();
			this.events();
			this.buildWindow();
		},
		
		setVars: function() {
			this.infobar = {
				$el: $( '.infobar' ),
				isOpened: !$html.hasClass( 'sidebar-right-collapsed' )
			};
			this.menubar = {
				$el: $( '.menubar ' ),
				isOpened: !$html.hasClass( 'sidebar-left-collapsed' )
			};
			
			return this;
		},
		
		events: function() {
			this.eventsMenuBar();
			this.eventsInfoBar();
			
			return this;
		},
		
		buildWindow: function() {
			var _self = this;
			
			var build = function() {
				var width = $window.width();

				if (width <= window.screenSm) {
					// Collapse menubar on small screens
					_self.menubar.events.expand();
				}
			};
			
			$(window).on('resize', function(e){
				build();
			});
		
			build();
		},
		
		buildMenuBar: function() {
			this.menubar.$nano = this.menubar.$el.find( '.nano' );
			var _self = this;
			
			var setH = function(){
				var tmpHeight = _self.menubar.$el.offset().top;
				_self.menubar.$nano.find('.nano-content').children().each(function(){
					 tmpHeight += $(this).height();
				});
				_self.menubar.$el.parent().css('height', tmpHeight);
			};
			
			if(this.customScroll){
				this.menubar.$nano = this.menubar.$el.find( '.nano' );

				this.menubar.$nano.nanoScroller({
					preventPageScrolling: true, 
					scroll: 'top'
				});

				return this;
			}else{
				setH();
				$window.on('navigation-toggled', function(){
					setH();
				});
			}
		},
		
		eventsMenuBar: function() {
			var _self = this;
			
			if(this.customScroll){
				var $nano = this.menubar.$nano;

				this.menubar.$el
					.on( 'click', function() {
						$nano.nanoScroller();
					});
					
				$nano
				.on( 'mouseenter', function() {
					$nano.nanoScroller();
				})
				.on( 'mouseleave', function() {
					$nano.nanoScroller();
				});

			}
			
			var toggleMenuBar = function(){
				_self.menubar.$el.toggleClass('hidden-xs');
				$html.toggleClass('sidebar-left-visible');
				$window.trigger( 'sidebar-left-hide-toggled',  $html.hasClass('sidebar-left-visible'));
			};
			
			$('[data-toggle="menubar"]').on('click', function(e) {
				toggleMenuBar();
			});
			
			var collapse = function() {
				if (! _self.menubar.isOpened ) {
					return expand();
				}
				$html.addClass('sidebar-left-collapsed');
				_self.menubar.isOpened = false;
			};
			
			var expand = function() {
				$html.removeClass('sidebar-left-collapsed');
				_self.menubar.isOpened = true;
			};

			$('[data-toggle="sidebar-left"]').on('click', function(e) {
				e.stopPropagation();
				
				if(_self.customScroll){
					$nano.nanoScroller();
				}
				
				if(_self.menubar.isOpened){
					collapse();
				}else{
					expand();
				}
				
				$window.trigger( 'sidebar-left-toggled',  $html.hasClass('sidebar-left-collapsed'));
			});
			
			this.menubar.events = {
				collapse: collapse,
				expand: expand
			};
			
			return this;
		},
		
		buildInfoBar: function() {
			var _self = this;
			this.infobar.$nano = this.infobar.$el.find( '.nano' );
			var $infobarContainer = this.infobar.$nano.find('.nano-content') || this.infobar.$nano;
			// Add info-element class to all infobar children
			$infobarContainer.children().each(function() {
				$(this).addClass('info-element');
			});
			
			if(this.customScroll){
				this.infobar.$nano = this.infobar.$el.find( '.nano' );

				this.infobar.$nano.nanoScroller({
					preventPageScrolling: true, 
					scroll: 'top'
				});
				
			}
			
			return this;
		},
		
		eventsInfoBar: function() {
			var _self = this;
			
			if(this.customScroll){
				var $nano = this.infobar.$nano;

				this.infobar.$el.on( 'click', function() {
					$nano.nanoScroller();
				});
					
				$nano
					.on( 'mouseenter', function() {
						$nano.nanoScroller();
					})
					.on( 'mouseleave', function() {
						$nano.nanoScroller();
					});

			}
			
			var collapse = function() {
				$html.addClass('sidebar-right-collapsed');
				 _self.infobar.isOpened = false;
				
				$window.trigger( 'sidebar-right-toggled',  _self.infobar.isOpened);
			};
			
			var expand = function() {
				$html.removeClass('sidebar-right-collapsed');
				 _self.infobar.isOpened = true;
				
				$window.trigger( 'sidebar-right-toggled',  _self.infobar.isOpened);
			};

			if(!this.infobar.isOpened){
				collapse();
			}
			
			if ($window.width() <= window.screenSm) {
				// Collapse infobar on small screens
				if(this.infobar.isOpened){
					collapse();
				}
			}
	
			$('[data-toggle="sidebar-right"]').on('click', function(e) {

				if(_self.customScroll){
					$nano.nanoScroller();
					$nano.find('.nano-pane').css('display', 'block');
				}
				
				if(_self.infobar.isOpened){
					collapse();
				}else{
					expand();
				}
			});

			this.infobar.events = {
				collapse: collapse,
				expand: expand
			};
					
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Skeleton: Skeleton
	});

}).apply(this, [ window.theme, jQuery ]);

// Init
(function(theme, $) {

	'use strict';

	theme = theme || {};

	theme.Skeleton.initialize();

}).apply(this, [ window.theme, jQuery ]);

/*
 * Custom Behaviors
 */



// Header
(function( $ ) {

	'use strict';
	
	var $element    = $( '.inner-header' );
	var $window		= $( window ),
		$html		= $( 'html' );
		
	function build(){
		if ($window.width() <= window.screenSm) {
			if($html.hasClass('fixed')){
				$window.on('scroll', function(){
					// Add sticky top
					if ($window.scrollTop() > $element.height()) {
						$html.addClass('sticky-top');
					} else{
						$html.removeClass('sticky-top');
					}
				});
			}
		}
	}
	
	$(window).on('resize', function(){
		build();
	});
	
	build();

}).apply( this, [ jQuery ]);

// Content section
(function( $ ) {

	'use strict';
	
	var $contentHeader    = $('.content-header');
	var $contentBody	  = $('.content-body');
	var $right	  		  = $('.content-header .content-header-right');

	function build(){

		if($contentHeader.height() > 90 ){
			$right.addClass('full-width');
		}else{
			$right.removeClass('full-width');
		}
		
		if($contentHeader.css('position') == 'fixed' && $(window).width() > window.screenSm){
			var height = $contentHeader.height();
			$contentBody.css('margin-top', height);
		}
		
		trimTitle();
	}
	
	function trimTitle(){
		if($contentHeader.height() > 90){
			var $pageTitle = $contentHeader.find('.page-title');
			var width = $pageTitle.width() - $contentHeader.find('.back-button').width();
			var lenght = $pageTitle.getTextThatFits(width);
			
			if(lenght < $pageTitle.text().length){
				var txt = $pageTitle.text().substring(0, lenght - 5).trim() + "...";
				$pageTitle.text(txt);
			}
		}
	}
	
	$(window).on('resize sidebar-right-toggled sidebar-left-toggled', function(e){
		build();
	});
	
	build();

}).apply( this, [ jQuery ]);

// Widgets
(function( $ ) {

	'use strict';

	$('.widget').on('click', '.widget-toggle', function(e) {
		e.preventDefault();
		var $widget = $( this ).closest('.widget');
		$widget.find('.widget-content').slideToggle();
		$widget.toggleClass('collapsed');
	});

}).apply( this, [ jQuery ]);

// Panels
(function( $ ) {

	'use strict';
	
	$('.panel')
		.on('click', '> .panel-heading .panel-actions .fa-caret-down, > .panel-heading .panel-actions .fa-caret-right', function(e) {
			e.preventDefault();
			var $panel = $( this ).closest('.panel');
		
			$panel.find('> .panel-body').slideToggle();
			$panel.find('> .panel-footer').slideToggle();
			$panel.toggleClass('collapsed');
			if($panel.hasClass('collapsed')){
				$(this).removeClass('fa-caret-down').addClass('fa-caret-right');
			}else{
				$(this).removeClass('fa-caret-right').addClass('fa-caret-down');
			}
		})
		.on('click', '.panel-actions .fa-times', function(e) {
			e.preventDefault();
			$( this ).closest('.panel').hide();
		});
		
	$('.panel.collapsed').find('.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');

}).apply( this, [ jQuery ]);

// Collapsible fieldset
(function( $ ) {

	'use strict';
	
	$( 'fieldset.collapsible' )
		.on('click', 'legend', function(e) {
			e.preventDefault();
			var $fieldset = $( this ).closest('fieldset');
			
			$fieldset.find('div.fieldset-wrapper').slideToggle( "fast", function() {
    			$fieldset.toggleClass('collapsed');
    			if($fieldset.hasClass('collapsed')){
					$fieldset.find('legend .fa').removeClass('fa-caret-down').addClass('fa-caret-right');
				}else{
					$fieldset.find('legend .fa').removeClass('fa-caret-right').addClass('fa-caret-down');
				}
  			});
		});
		
		$('fieldset.collapsed').find('legend .fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');

}).apply( this, [ jQuery ]);

// Accordation
(function( $ ) {

	'use strict';

	$('.accordation-actions').each(function() {
		toggleAction($(this), $(this).parents('.panel-accordion').find('.accordion-body').hasClass('in'));
	});
	
	$('.panel-accordion').on('shown.bs.collapse', function() {
		toggleAction($(this).find('.accordation-actions'), true);
	});
	
	$('.panel-accordion').on('hidden.bs.collapse', function() {
		toggleAction($(this).find('.accordation-actions'), false);
	});
	
	function toggleAction($element, isActive){
		if(isActive){
			$element.find('.accordation-icon-collapsed').hide();
			$element.find('.accordation-icon-expanded').show();
		}else{
			$element.find('.accordation-icon-collapsed').show();
			$element.find('.accordation-icon-expanded').hide();
		}
	}

}).apply( this, [ jQuery ]);

// Switch
(function( $ ) {

	'use strict';
	
	$( '.switch' ).each(function(){
		$( this ).find('input[type="checkbox"]').hide();
		$( this ).on('click', '.switch-handle', function(e) {
			e.preventDefault();
			var $switch = $( this ).closest('.switch'),
				checkbox =  $switch.find('input[type="checkbox"]'),
				isChecked = checkbox.is(':checked');
			if(isChecked) {
        		checkbox.prop('checked',false);
    		} else {
        		checkbox.prop('checked', true); 
    		}
		});
	});

}).apply( this, [ jQuery ]);

// Secondary tabs
(function( $ ) {

	'use strict';
	
	hideSecondaryTabs();
	
	$('.nav-tabs-primary li').each(function() {
		if($(this).hasClass('active')){
			showSecondaryTab($(this).data('tabs-children'));
		}
		$(this).on('click', function(){
			hideSecondaryTabs();
			var tabsChildren = $(this).attr('data-tabs-children');
			if (typeof tabsChildren !== typeof undefined && tabsChildren !== false) {
			    showSecondaryTab(tabsChildren);
			}
		});
	});
	
	function showSecondaryTab(id){
		$('.nav-tabs-secondary#' + id).show();
	}
	function hideSecondaryTabs(){
		$('.nav-tabs-secondary').hide();
	}

}).apply( this, [ jQuery ]);

// Primary tabs
(function( $ ) {

	'use strict';
	
	if($('.content-header .primary-tabs').length > 0){
		$('.content-body').addClass('tab-content');
	}
	
	// Navigate by hashtag
	var hash = window.location.hash;
	if(hash && $('.primary-tabs a[href="' + hash + '"]').tab('show')){
		window.scrollTo(0, 0);
		 $('html,body').scrollTop(1);
	}
	
	  $('.primary-tabs a').click(function (e) {
	    $(this).tab('show');
	    window.location.hash = this.hash;
	    $('html,body').scrollTop(0);
	  });
	  
	 $('.primary-tabs a').on('shown.bs.tab', function (e) {
	    $('html,body').scrollTop(0);
	});

}).apply( this, [ jQuery ]);


/*
 * Custom Plugins
 */

// Infobar plugin
(function( theme, $ ) {

	theme = theme || {};

	var pluginName = 'infobar';
	
	var InfoBar = function (options, element) {    	
    	return this.init(options, element);
  	};
  	
  	InfoBar.DEFAULTS = {
		type: 'alert' 		// Alert or notification. Default is alert
	  , style: 'default' 	// State of alert (default, primary, info, success, warning, danger)
	  , icon: ''			// Custom icon if there isn't one set inside the alert. Set false for no icon. 
	  						// Defaults for states: default, primary, info: fa-info-circle , success: fa-check , warning: fa-warning , danger: fa-times-circle
	  , content: ''			// Override default content (inside alertbox)
	  , index: 0			// Order of alert in infobar
	  , delay: 0			// Alert will disapear after timeout
	  , target: false		// Default is the parent item
	  , trigger: 'appear'	// Trigger event (appear, hover, focus, click, manual) 
	  , visibleByDefault: false	// Initial visibility of alert
  	};
  	
  	InfoBar.prototype = {
  		
  		constructor: InfoBar,
  		
  		$alert: $('<div/>'),
  		
    	init: function (element, options) {
    		this.$container = $('.infobar').find('.nano-content') || $('.infobar').find('.nano');
  			this.$containerChildren = this.$container.children('.info-element');
  			this.$alert = this.getAlert(element);
  			this.setDefaults();
			this.setData();
			this.setOptions(options);
  			this.$element = this.getElement();

			this.setType();
			this.setAlert();
		
  			this.add(this.$alert);
			if(!this.options.visibleByDefault){
  				this.$alert.hide();
  			}
  			
  			var itemClass = !$('html').hasClass('sidebar-right-collapsed') ? 'expanded' : 'collapsed';
			this.$alert.addClass(itemClass);
  			if($('html').hasClass('sidebar-right-collapsed')){
  				this.$alert.addClass('expanded');
				window.theme.Skeleton.infobar.events.collapse();
			}
  			
  			if(this.options.trigger !== 'manual'){
  				var triggers = this.options.trigger.split(' ');
	    		for (var i = triggers.length; i--;) {
	    			var trigger = triggers[i];
		  			switch(trigger) {
					    case 'appear':
					    	this.$element.appear();
					    	this.$element.on('appear', this.$alert, $.proxy(this.fadeIn, this));
					    	$(window).on('scroll', this.$element, $.proxy(this.disappear, this));
					        break;
					    case 'click':
					        this.$element.on('click', this.$alert, $.proxy(this.toggle, this));
					        break;
					    case 'hover':
					    case 'hover focus':
					    case 'focus':
					    	var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
		        			var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
		
		        			this.$element.on(eventIn, this.$alert, $.proxy(this.fadeIn, this));
		        			this.$element.on(eventOut, this.$alert, $.proxy(this.fadeOut, this));
					        break;
					};
				}
  			}
  			return this;
  		},
  		
  		setData: function() {
			var html5data = ( typeof $.html5data === 'function' ? this.$alert.html5data(pluginName) : this.$alert.data(pluginName) );
			this.metadata =  $.extend({}, this.$alert.data(pluginName), html5data);
			return this;
		},
		
		setDefaults: function () {
			this.defaults = InfoBar.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},
    	
    	getAlert: function(alert){
    		var $alert = $(alert);
			if($alert === undefined || $alert.length <= 0){
				$alert = $('<div/>');
			}
			var uid = $alert.attr('id');
			if (typeof uid === typeof undefined || uid === false) {
				uid = this.getUID('infobar');
			}
			$alert.attr('id', uid);
			
			return $alert;
    	},
    	
    	setAlert: function(){
			this.setClasses();
			this.setContent();
    	}, 
    	
    	getElement: function(){
    		return this.options.target !== false ? $(this.options.target) : this.$alert.parent();
    	}, 
    	
    	setType: function(){
    		if(this.$alert.hasClass('notification') && this.options.type !== 'notification'){
    			this.options.type = 'notification';
    		}
    	}, 
    	
    	isNotification: function(){
    		return this.options.type !== 'alert';
    	}, 
    	
    	getClasses: function(alert){
    		var $alert = alert || this.$alert;
    		var classes = 'info-element';
    		if(!$alert.hasClass('alert')){
    			classes += ' alert';
    		}
    		
    		if(!$alert.is('[class*="alert-"]')){
    			classes += ' alert-' + this.options.style;
    		}
    		
    		if(this.isNotification() && !$alert.hasClass('notification')){
    			classes += ' notification';
    		}
    		
    		return classes;
    	}, 
    	
    	setClasses: function(alert){
    		var $alert = alert || this.$alert;
    		var classes = this.getClasses($alert);
    		$alert.addClass(classes);

			if(this.options.icon === false){
				$alert.addClass('alert-no-icon');
			}
    	}, 
    	
    	getIcon: function(alert){
    		var $alert = alert || this.$alert;
			var icon = this.options.icon;

    		if($alert.find('i.fa').first().length <= 0 && icon.length <= 0 && icon !== false){
    			switch(this.options.style){
    				case 'default':
    				case 'primary':
    				case 'info':
				    	icon = 'fa-info-circle';
				        break;
				    case 'success':
				    	icon = 'fa-check';
				        break;
				   case 'warning':
				    	icon = 'fa-warning';
				        break;
				   case 'danger':
				    	icon = 'fa-times-circle';
				        break;
				   default:
				   		icon = 'fa-info-circle';
    			}
    		}
    		
    		if(icon.length > 0){
    			return '<i class="fa fa-lg fa-fw ' + icon + '"></i>';
    		}
    		
    		return false;
    	}, 
    	
    	setContent: function(alert){
    		var $alert = alert || this.$alert;

    		if(this.options.content.length <= 0){
    			this.options.content = $alert.html();
    		}
    		var icon = this.getIcon($alert);
    		if(icon !== false){
    			this.options.content = icon + this.options.content;
    		}
    		
    		$alert.html(this.options.content);
    		
    		if($alert.find('.close').length <= 0){
				$alert.prepend($('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'));
			}
    	},
    	
    	getUID: function (prefix) {
		    do prefix += Math.round((Math.random() * 1000000));
		    while (document.getElementById(prefix));
		    return prefix;
  		}, 
  		
  		getItemByIndex: function(){
    		var index = this.options.index;
			if(index > 0){
				do {
	    			index--;
	    			var $item = this.$containerChildren.eq(index);
				}while ($item.length == 0 && index >= 0);
				
				return $item;
			}
			
			return false;
    	},
    	
    	add: function(alert){
  			var $alert = alert || this.$alert;
  			var $item = this.getItemByIndex();
			
			if($item !== false){
				$item.after($alert);
			}else{
				this.$container.prepend($alert);
			}
  		},
  		
  		show: function(){
  			var $alert = this.$alert;
  			this.$alert.show();
  			
  			if(this.options.delay > 0){
  				this.timeout = setTimeout($.proxy(this.fadeOut, this, $alert), this.options.delay);
  			}
  		},
  		
  		hide: function(){
  			this.$alert.hide();
  		},
  		
  		fadeIn: function(){
  			var $alert = this.$alert;
  			$alert.fadeIn('slow');
				
			if(this.options.delay > 0){
  				this.timeout = setTimeout($.proxy(this.fadeOut, this, $alert), this.options.delay);
  			}
  		},
  		
  		fadeOut: function(){
  			var $alert = this.$alert;
  			$alert.fadeOut('slow');
  		},
  		
  		toggle: function(){
  			var $alert = this.$alert;
  			$alert.is(':visible') ? this.fadeOut($alert) : this.fadeIn($alert);
  		},
  		
  		disappear: function () {
    		if(this.isDisappeared()){
	    		this.fadeOut();
	    	}
    	},
    	
    	isDisappeared: function () {
			var offset = $('.content-body').offset().top + 15;
	    	var docViewTop = $( window ).scrollTop() + offset;
	    	var docViewBottom = ((docViewTop - offset) + $( window ).height());
	
	    	var elemTop = this.$element.offset().top;
	    	var elemBottom = elemTop + this.$element.height();
	    	return ((elemBottom <= docViewTop) || (elemTop >= docViewBottom));
		}
 	};
 
	// expose to scope
	$.extend(theme, {
		InfoBar: InfoBar
	});
	
	// jquery plugin
	$.fn.infobar = function ( option ) {
    	return this.each(function () {
      		var $this = $(this)
          		, data = $this.data(pluginName)
          		, options = typeof option == 'object' && option;
      		if (!data) $this.data(pluginName, (data = new InfoBar($this, options)));
      		if (typeof option == 'string') data[option]();
    	});
  	};

}).apply( this, [ window.theme, jQuery ]);

// Build Infobar contents
(function( $ ) {

	'use strict';
	
	var $infobar = $( '.infobar' );
	var isOpened = !$( 'html' ).hasClass( 'sidebar-right-collapsed' );
	var itemClass = isOpened ? 'expanded' : 'collapsed';

	$infobar.find('.info-element').each(function() {
		if(itemClass == 'collapsed' && !$(this).hasClass('collapsed')){
			collapseItem($(this));
		}else{
			$(this).addClass(itemClass);
		}
	});
	
	$(window).on('sidebar-right-toggled', function(e, isOpened){
		e.stopPropagation();
		isOpened ? expand() : collapse();
	});
	
	function collapse(){
		$infobar.find('.info-element.expanded').each(function() {
			collapseItem($(this));
		});
	};
	
	function expand(){
		$infobar.find('.info-element.collapsed').each(function() {
			expandItem($(this));
		});
	};
	
	function expandItem(item){
		var $item = item;
		var button = $item.children('a.toggle-popover');
			button.popover('hide');
			button.remove();
			
		var content = $item.children('.hidden').html();
		
		$item.html(content);
		$item.find('.close').removeClass('hidden');
		$item.find('.widget-toggle').removeClass('hidden');
		
		$item.removeClass()
			 .addClass('expanded')
			 .addClass($item.data('origClasses'));
	};
	
	function collapseItem(item){
		var $item = item;
		var origClasses = $item.attr('class');
		var style = 'default';
		
		$item.data('origClasses', origClasses);
		$item.find('.close').addClass('hidden');
		$item.find('.widget-toggle').addClass('hidden');

		if($item.is('[class*="alert-"]')){
			var classes = $item.attr('class').split(' ');
    		for ( var index in classes ) {
        		if ( classes[index].match(/^alert-/) ) {
            		style = classes[index].split( '-' )[1];
            		break;
        		}
    		}
		}
					
		$item.addClass('alert')
			 .addClass('alert-'+ style);
		
		var content = $item.html();
					
		var button = getButton(style, $item, content);
					
    	var $wrapper = $('<div></div>').addClass('hidden')
    								   .html(content);
		$item.html($wrapper)
			 .prepend(button)
			 .removeClass('expanded')
			 .addClass('collapsed');
	};
	
	function getIcon(style, $item){
		var iconClass = 'fa-info-circle';
		switch(style) {
    			case 'succsess':
        			iconClass = 'fa-check';
        			break;
        		case 'warning':
        			iconClass = 'fa-warning';
        			break;
        		case 'danger':
        			iconClass = 'fa-times-circle';
        			break;
       }
       
       return $item.find('i.fa').first().length > 0 ? $item.find('i.fa').first().addClass('fa-lg') : $('<i />').addClass('fa fa-lg').addClass(iconClass);
	}
	
	function createButton(style, isNotification, $icon){
		var btClass = style;
		if(isNotification){
			btClass += ' notification';
		}
		
		var $button = $('<a />').addClass('toggle-popover')
								.data('class', btClass)
								.attr('rel', 'popover')
								.append($icon);
		return $button;
	}
	
	function getButton(style, $item, content){
		var $icon = getIcon(style, $item);
		var $button = createButton(style, $item.hasClass('notification'), $icon);
		
		// Add popover
		if ( $.isFunction( $.fn['popover'] ) ) {
			var template = $('<div></div>');
  				template.html('<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>');
  				template.find('.popover').addClass($button.data('class')).addClass('popover-info-bar');
			$button.popover({
	        	html : true, 
	        	content: function() {
	          		return content;
	        	},
	        	placement:'left',
	        	container: '.main-wrapper',
	        	template: template.html()
	    	});
	    }
	    
	    return $button;
	}

}).apply( this, [ jQuery ]);

// Action buttons plugin
(function( theme, $ ) {

	theme = theme || {};

	var pluginName = 'action-buttons';
	
	var ActionButtons = function (element, options) {    	
    	return this.init(element, options);
  	};
  	
  	ActionButtons.DEFAULTS = {
  		primaryButton: false
  	};
  	
  	ActionButtons.prototype = {
    	
    	init: function (element, options) {
  			this.$element = $(element);
  			this.$container = $('.content-header');
  			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.setVars();
  			this.build();
  			
  			var _self = this;
  			$(window).on('resize sidebar-right-toggled sidebar-left-toggled', function(e){
				_self.build();
			});
  			
  			return this;
  		},
  		
  		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = ActionButtons.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},
    	
    	setVars: function () {
    		this.$form = this.$element.closest('form');
    		this.$primary = this.getPrimary();
    		this.setPrimary();
			return this;
    	},
    	
    	getPrimary: function(){
    		var $primary = this.options.primaryButton === false ? this.$element.find('[data-primary-button="true"]') : $(this.options.primaryButton);
    		if($primary !== undefined && $primary.length > 0){
    			return $primary;
    		}
    		return false;
    	},
    	
    	setPrimary: function(){
    		if(this.$primary !== false){
  				this.$primary.attr('disabled', 'disabled');
  				var _self = this;
  				
  				this.$form.change(function() {
  					_self.$primary.removeAttr('disabled');
  				});
  			}
    	},
  		
  		isFixed: function(){
  			return $('html').hasClass('fixed');
  		},
  		
  		hasSpace: function(){
			var elementsWidth = this.$element.children().width();
			if(!this.$element.is(':visible')){
				var clone = this.$element.clone();
				clone.show().appendTo( "body" );
				elementsWidth = clone.width();
				clone.remove();
			}
			
			this.$container.children().each(function(){
	  			elementsWidth += $(this).outerWidth();
			});
			if(elementsWidth > this.$container.width()){
				return false;
			}
  			return true;
  		},
  		
  		build: function(){
  			if(this.isFixed() && this.hasSpace()){
  				this.$element.addClass('content-header-actions');
  				this.place();
			}else{
				this.$element.removeClass('content-header-actions');
				this.unSetPlace();
			}
  		},
  		
  		place: function(){
  				var $contentHeader    = $('.content-header');
				var $right	  		  = $('.content-header .content-header-right');
				var marginRight       = 0;
				var rightPos          = -1;
				if(typeof $right !== typeof undefined && $right.length > 0){
					rightPos = $right.position().top;
				}
  				if($contentHeader.height() < 60 && rightPos == 0){
  					marginRight = $right.outerWidth();
  				}
  				this.$element.css('margin-right', marginRight);
  				$('.content-header-left').css('padding-right', this.$element.outerWidth());
  		},
  		
  		unSetPlace: function(){
  			this.$element.removeAttr('style');
  			$('.content-header-left').css('padding-right', "");
  		}
  	};

	// expose to scope
	$.extend(theme, {
		ActionButtons: ActionButtons
	});

	// jquery plugin
	$.fn.actionButtons = function ( options ) {
    	return this.each(function () {
    		var $this = $(this);
    		if (!$this.data(window.instPrefix + pluginName)) {
				new ActionButtons($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
    	});
  	};

}).apply( this, [ window.theme, jQuery ]);

// Form descriptions
(function( theme, $ ) {
	
	theme = theme || {};

	var pluginName = 'formdescription';
	
	var FormDescription = function (element, options) {
    	return this.init(element, options);
  	};
  	
  	FormDescription.DEFAULTS = {
		    input: false
		  , display: 'placeholder'
  	};
  	
  	FormDescription.prototype = {
  		init: function (element, options) {
  			this.$element = $(element);
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.setVars();
			this.setItem();
  			this.addDisplay();
  			
  			return this;
  		},
  		
  		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = FormDescription.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},
    	
    	setVars: function () {
    		this.text     = this.$element.text();
			this.textHtml = this.$element.html();
			return this;
    	},
    	
    	setItem: function () {
    		var $item;
      		if(this.options.input !== false && $(this.options.input).length > 0){
				$item = $(this.options.input);
			}else{
				if(this.$element.prev('input').length > 0){
					$item = this.$element.prev('input');
				}else{
					$item = this.$element.prev('textarea');
				}
			}
			this.$item = $item;
			return this;
    	},
    	
    	addDisplay: function () {
    		var _self = this;
    		var $element = this.$element;
    		var $item = this.$item;
    		switch(this.options.display){
				case 'placeholder':
					var placeholder = $item.attr('placeholder');
					if (typeof placeholder === typeof undefined || placeholder === false) {
						$item.attr('placeholder', _self.text);
						var pos = $( 'html' ).hasClass('sidebar-right-collapsed') ? 'top' : 'right';
						_self.addPopover($item, pos);
						$item.popover('hide');
						this.hideElement();
						$item
							.on('focusin', function(){
								$(this).popover('show');
								$(this).attr('placeholder', '');
							}).on('focusout', function(){
								$(this).attr('placeholder', _self.text);
								$(this).popover('hide');
							});
					}
        			break;
        		case 'after-form-item':
					var $icon = $('<a class="form-description-icon"><i class="fa fa-question-circle"></i></a>');
					var pos = $( 'html' ).hasClass('sidebar-right-collapsed') ? 'top' : 'right';
					this.addPopover($icon, pos);
					var $wrapper = $('<div class="form-description-wrapper"></div>');
					$item.wrap($wrapper);
					$item.after($icon);
					this.hideElement();
        			break;
        		case 'after-label':
					var $icon = $('<a class="form-description-icon"><i class="fa fa-question-circle"></i></a>');
					var pos = 'top';
					this.addPopover($icon, pos);
					var $label = $('label[for="'+ $item.attr('id') +'"]');
					$label.append($icon);
					this.hideElement();
        			break;
			}
    	},
    	
    	hideElement: function () {
    		this.$element.hide();
    	},
    	
    	addPopover: function ($el, position) {
    		if ( $.isFunction( $.fn['popover'] ) ) {
					var icon = '<i class="fa fa-info-circle"></i>',
						textHtml = this.textHtml;
					var trigger = $el.hasClass('form-description-icon') ? "click" : "manual";
					$el.popover({
						html: true,
						trigger: trigger,
						content: icon + textHtml,
						placement: position,
						template: '<div class="popover popover-form-description"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
					});
					
					$(window).on('scroll', function(){
						$el.popover('hide');
					});
			}
    	}
    };

	// expose to scope
	$.extend(theme, {
		FormDescription: FormDescription 
	});

	// jquery plugin
	$.fn.formDescription = function ( options ) {
    	return this.each(function () {
    		var $this = $(this);
    		if (!$this.data(window.instPrefix + pluginName)) {
				new FormDescription($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
    	});
  	};

}).apply( this, [ window.theme, jQuery ]);

// Mailbox
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'mailbox';

	var capitalizeString = function( str ) {
    	return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	};

	var Mailbox = function($element) {
		return this.init($element);
	};

	Mailbox.prototype = {
		init: function($element) {

			this.$element = $element;
			this.setOptions();
			this.setData();
			this.build();
			this.events();

			return this;
		},

		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
		},

		setOptions: function(options) {
			this.view = capitalizeString( this.$element.data( 'mailbox-view' ) || "" );
			return this;
		},


		build: function() {
			if ( typeof this[ 'build' + this.view ] === 'function' ) {
				this[ 'build' + this.view ].call( this );
			}
			return this;
		},

		events: function() {
			if ( typeof this[ 'events' + this.view ] === 'function' ) {
				this[ 'events' + this.view ].call( this );
			}

			return this;
		},


		buildEmail: function() {
			this.buildComposer();
		},

		buildCompose: function() {
			this.buildComposer();
		},

		buildComposer: function() {
			this.$element.find( '#compose-field' ).summernote({
				height: 250,
				toolbar: [
					['style', ['style']],
					['font', ['bold', 'italic', 'underline', 'clear']],
					['fontname', ['fontname']],
					['color', ['color']],
					['para', ['ul', 'ol', 'paragraph']],
					['height', ['height']],
					['table', ['table']],
					['insert', ['link', 'picture', 'video']],
					['view', ['fullscreen']],
					['help', ['help']]
				]
			});
		},
	};

	// expose to scope
	$.extend(theme, {
		Mailbox: Mailbox
	});

	// jquery plugin
	$.fn.clMailbox = function(opts) {
		return this.each(function() {
			new Mailbox($(this));
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Widget - Task
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'taskList';

	var TaskList = function($element, options) {
		return this.init($element, options);
	};

	TaskList.DEFAULTS = {};

	TaskList.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.build();
			this.events();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = TaskList.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		check: function( input, label ) {
			if ( input.is(':checked') ) {
				label.addClass('line-through');
			} else {
				label.removeClass('line-through');
			}
		},

		build: function() {
			var _self = this,
				$check = this.$element.find('.task-check');

			$check.each(function () {
				var label = $(this).closest('li').find('.task-label');
				_self.check( $(this), label );
			});

			return this;
		},

		events: function() {
			var _self = this,
				$remove = this.$element.find( '.task-remove' ),
				$check = this.$element.find('.task-check'),
				$window = $( window );

			$remove.on('click.widget-task-list', function( e ) {
				e.preventDefault();
				$(this).closest("li").remove();
			});

			$check.on('change', function () {
				var label = $(this).closest('li').find('.task-label');
				_self.check( $(this), label );
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		TaskList: TaskList
	});

	// jquery plugin
	$.fn.clTaskList = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new TaskList($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);


/*
 * Wrapper Plugins
 */

// Lightbox plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'lightbox';

	var Lightbox = function($element, options) {
		return this.init($element, options);
	};

	Lightbox.DEFAULTS = {
		tClose: 'Close (Esc)', // Alt text on close button
		tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
		gallery: {
			tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
			tNext: 'Next (Right arrow key)', // Alt text on right arrow
			tCounter: '%curr% of %total%' // Markup for "1 of 7" counter
		},
		image: {
			tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
		},
		ajax: {
			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
		}
	};

	Lightbox.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addLightbox();

			return this;
		},

		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Lightbox.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options, {
				wrapper: this.$element
			});

			return this;
		},

		addLightbox: function() {
			this.options.wrapper.magnificPopup(this.options);
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Lightbox: Lightbox
	});

	// jquery plugin
	$.fn.clLightbox = function(options) {
		return this.each(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Lightbox($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Slider Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'slider';

	var Slider = function($element, options) {
		return this.init($element, options);
	};

	Slider.DEFAULTS = {};

	Slider.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setOutput();
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addSlider();

			return this;
		},

		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Slider.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			var _self = this;
			this.options = $.extend(true, {}, this.defaults, options);

			if ( this.$output ) {
				$.extend( this.options, {
					slide: function( event, ui ) {
						_self.onSlide( event, ui );
					}
				});
			}

			return this;
		},
		
		setOutput: function() {
			var $output = $( this.$element.data('plugin-slider-output') );
			this.$output = $output.get(0) ? $output : null;

			return this;
		},

		addSlider: function() {
			this.$element.slider( this.options );
			return this;
		},

		onSlide: function( event, ui ) {
			if ( !ui.values ) {
				this.$output.val( ui.value );
			} else {
				this.$output.val( ui.values[ 0 ] + '/' + ui.values[ 1 ] );
			}

			this.$output.trigger('change');
		}
	};

	// expose to scope
	$.extend(theme, {
		Slider: Slider
	});

	// jquery plugin
	$.fn.clSlider = function(options) {
		return this.each(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Slider($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Carousel Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'carousel';

	var Carousel = function($element, options) {
		return this.init($element, options);
	};

	Carousel.DEFAULTS = {
		itemsDesktop: false,
		itemsDesktopSmall: false,
		itemsTablet: false,
		itemsTabletSmall: false,
		itemsMobile: false
	};

	Carousel.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addCarousel();
			
			var _self = this;
			$(window).on('resize sidebar-right-toggled sidebar-left-toggled', function(e){
  				e.stopPropagation();
				_self.addCarousel();
			});

			return this;
		},

		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Carousel.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options, {
				wrapper: this.$element
			});

			return this;
		},

		addCarousel: function() {
			this.options.wrapper.owlCarousel(this.options).addClass("owl-carousel-init");

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Carousel: Carousel
	});

	// jquery plugin
	$.fn.clCarousel = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Carousel($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Animation Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'animation';

	var Animation = function($element, options) {
		return this.init($element, options);
	};

	Animation.DEFAULTS = {
		delay: 1
	};

	Animation.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addAnimation();

			return this;
		},

		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Animation.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options, {
				wrapper: this.$element
			});

			return this;
		},

		addAnimation: function() {
			var _self = this,
				$element = this.options.wrapper;

			$element.addClass('appear-animation');

			if(!$('html').hasClass('no-csstransitions') && $(window).width() > 767) {
				$element.appear();
				$element.on('appear', $element, function() {
					var delay = ($element.attr('data-appear-animation-delay') ? $element.attr('data-appear-animation-delay') : _self.options.delay);

					if(delay > 1) {
						$element.css('animation-delay', delay + 'ms');
					}

					$element.addClass($element.attr('data-appear-animation')).addClass('animated');

					setTimeout(function() {
						$element.addClass('appear-animation-visible');
					}, delay);

				});

			} else {

				$element.addClass('appear-animation-visible');

			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Animation: Animation
	});

	// jquery plugin
	$.fn.clAnimation = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Animation($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// TextArea AutoSize
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'autosize';

	var AutoSize = function($element, options) {
		return this.init($element, options);
	};

	AutoSize.DEFAULTS = {};

	AutoSize.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.$element.autosize(this.options);

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = AutoSize.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},
	};

	// expose to scope
	$.extend(theme, {
		AutoSize: AutoSize
	});

	// jquery plugin
	$.fn.clAutoSize = function(options) {
		return this.each(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new AutoSize($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// File input Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'fileinput';

	var FileInput = function($element, options) {
		return this.init($element, options);
	};

	FileInput.DEFAULTS = {
		browseIcon: '<i class="fa fa-fw fa-folder-open"></i>',
		removeIcon: '<i class="fa fa-fw fa-trash"></i>',
		uploadIcon: '<i class="fa fa-fw fa-upload"></i>',
	};

	FileInput.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addFileInput();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = FileInput.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addFileInput: function() {
			this.$element.fileinput(this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		FileInput: FileInput
	});

	// jquery plugin
	$.fn.clFileInput = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new FileInput($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Select2 Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'select2';

	var Select2 = function($element, options) {
		return this.init($element, options);
	};

	Select2.DEFAULTS = {};

	Select2.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addSelect2();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Select2.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addSelect2: function() {
			this.$element.select2( this.options );
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Select2: Select2
	});

	// jquery plugin
	$.fn.clSelect2 = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Select2($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Masked Input Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'maskedInput';

	var MaskedInput = function($element, options) {
		return this.init($element, options);
	};

	MaskedInput.DEFAULTS = {};

	MaskedInput.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addMaskedInput();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = MaskedInput.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},
		
		addMaskedInput: function() {
			this.$element.mask( this.$element.data('input-mask'), this.options );
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		MaskedInput: MaskedInput
	});

	// jquery plugin
	$.fn.clMaskedInput = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new MaskedInput($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Datepicker Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'datepicker';

	var Datepicker = function($element, options) {
		return this.init($element, options);
	};

	Datepicker.DEFAULTS = {};

	Datepicker.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.setSkin();
			this.addDatepicker();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Datepicker.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},
		
		setSkin: function() {
			this.skin = this.$element.data('plugin-skin');
			return this;
		},


		addDatepicker: function() {
			this.$element.datepicker( this.options );

			if (!!this.skin) {
				var datepicker = this.$element.data('datepicker');
				if(datepicker.picker){
					datepicker.picker.addClass( 'datepicker-' + this.skin );
				}else{
					$.each(datepicker.pickers, function(i, obj){
						obj.picker.addClass( 'datepicker-' + this.skin );
					});
				}
			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Datepicker: Datepicker
	});

	// jquery plugin
	$.fn.clDatepicker = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Datepicker($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Timepicker Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'timepicker';

	var Timepicker = function($element, options) {
		return this.init($element, options);
	};

	Timepicker.DEFAULTS = {};

	Timepicker.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addTimepicker();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Timepicker.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addTimepicker: function() {
			this.$element.timepicker( this.options );
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Timepicker: Timepicker
	});

	// jquery plugin
	$.fn.clTimepicker = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Timepicker($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Colorpicker Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'colorpicker';

	var Colorpicker = function($element, options) {
		return this.init($element, options);
	};

	Colorpicker.DEFAULTS = {};

	Colorpicker.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addColorpicker();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Colorpicker.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addColorpicker: function() {
			this.$element.colorpicker( this.options );
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Colorpicker: Colorpicker
	});

	// jquery plugin
	$.fn.clColorpicker = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Colorpicker($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// MaxLength Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'maxlength';

	var MaxLength = function($element, options) {
		return this.init($element, options);
	};

	MaxLength.DEFAULTS = {
		alwaysShow: true,
        warningClass: "label label-success",
        limitReachedClass: "label label-danger",
        separator: ' of ',
        preText: 'You have ',
        postText: ' chars remaining.',
        validate: true
	};

	MaxLength.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addMaxLength();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = MaxLength.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addMaxLength: function() {
			this.$element.maxlength( this.options );
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		MaxLength: MaxLength
	});

	// jquery plugin
	$.fn.clMaxLength = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new MaxLength($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// CodeMirror Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'codemirrorPlugin';

	var CodeMirrorPlugin = function($element, options) {
		return this.init($element, options);
	};

	CodeMirrorPlugin.DEFAULTS = {
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true,
		theme: 'monokai'
	};

	CodeMirrorPlugin.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addCodeMirror();

			return this;
		},

		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = CodeMirrorPlugin.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addCodeMirror: function() {
			CodeMirror.fromTextArea( this.$element.get(0), this.options );

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		CodeMirrorPlugin: CodeMirrorPlugin
	});

	// jquery plugin
	$.fn.clCodeMirror = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new CodeMirrorPlugin($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Summernote Plugin
(function(theme, $) {

	theme = theme || {};

	var pluginName = 'summernote';

	var Summernote = function($element, options) {
		return this.init($element, options);
	};

	Summernote.DEFAULTS = {
		onfocus: function() {
			$( this ).closest( '.note-editor' ).addClass( 'active' );
		},
		onblur: function() {
			$( this ).closest( '.note-editor' ).removeClass( 'active' );
		}
	};

	Summernote.prototype = {
		init: function($element, options) {
			this.$element = $element;
			this.setDefaults();
			this.setData();
			this.setOptions(options);
			this.addSummernote();

			return this;
		},
		
		setData: function() {
			this.$element.data(window.instPrefix + pluginName, this);
			
			return this;
		},
		
		setDefaults: function () {
			this.defaults = Summernote.DEFAULTS;
    		return this;
  		},

		setOptions: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			return this;
		},

		addSummernote: function() {
			this.$element.summernote( this.options );
			
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		Summernote: Summernote
	});

	// jquery plugin
	$.fn.clSummernote = function(options) {
		return this.map(function() {
			var $this = $(this);
			if (!$this.data(window.instPrefix + pluginName)) {
				new Summernote($this, options);
			}else{
				$this.data(window.instPrefix + pluginName);
			}
		});
	};

}).apply(this, [ window.theme, jQuery ]);


/*
 * Init functions
 */

// Notifications
(function( $ ) {

	'use strict';

	$('.notification-content').each(function() {
		$(this).addScroller();
	});
	

}).apply( this, [ jQuery ]);

// Go top
(function( $ ) {

	'use strict';

	$('[rel="go-top"]').click(function(){
		$('html, body').animate({scrollTop : 0}, 'slow');
		return false;
	});
	

}).apply( this, [ jQuery ]);

// Go back
(function( $ ) {

	'use strict';

	$('[rel="go-back"]').click(function(){
		window.history.back();
	});
	

}).apply( this, [ jQuery ]);

// Infobar
(function( $ ) {

	'use strict';
	
	$('[data-infobar]').each(function() {
		var $this = $( this );
		var html5data = ( typeof $.html5data === 'function' ? $this.html5data('infobar') : {} );
		var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
		$this.infobar(options);
	});

}).apply( this, [ jQuery ]);

// Action buttons
(function( $ ) {

	'use strict';

	$('[data-action-buttons], .form-action-buttons').each(function() {
		var $this = $( this );
		var html5data = ( typeof $.html5data === 'function' ? $this.html5data('action-buttons') : {} );
		var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
		$this.actionButtons(options);
	});

}).apply(this, [ jQuery ]);

// Form description
(function( $ ) {

	'use strict';

	$('[data-form-description]').each(function() {
		var $this = $( this );
		var html5data = ( typeof $.html5data === 'function' ? $this.html5data('form-description') : {} );
		var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
		$this.formDescription(options);
	});

}).apply(this, [ jQuery ]);

// Mailbox
(function( $ ) {

	'use strict';

	$(function() {
		$('[data-mailbox]').each(function() {
			var $this = $( this );
			$this.clMailbox();
		});
	});

}).apply(this, [ jQuery ]);

//Task
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'clTaskList' ]) ) {

		$(function() {
			$('[data-tasklist], ul.widget-task-list').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('tasklist') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clTaskList(options);
			});
		});

	}

}).apply(this, [ jQuery ]);


// Nano scroller
(function( $ ) {

	'use strict';
	
	if ( $.isFunction( $.fn['nanoScroller'] ) ) {
		if(!$('html').hasClass('scroll')){
			$('.nano').nanoScroller({
				preventPageScrolling: true
			});
		}
	}

}).apply( this, [ jQuery ]);


// Popover
(function( $ ) {

	'use strict';

	if ( $.isFunction( $.fn['popover'] ) ) {
		$( '[data-toggle=popover]' ).popover();
		
		$(window).on('scroll', function(){
			$( '[data-toggle=popover]' ).popover('hide');
		});
	}

}).apply( this, [ jQuery ]);

// Tooltip
(function( $ ) {

	'use strict';

	if ( $.isFunction( $.fn['tooltip'] ) ) {
		$( '[data-toggle=tooltip],[rel=tooltip]' ).tooltip({ container: 'body' });
	}

}).apply( this, [ jQuery ]);

// Select2 site chooser
(function( $ ) {

	'use strict';

	if ( $.isFunction( $.fn['select2'] ) ) {
		$( 'select.site-chooser' ).select2({
			dropdownCssClass: "inverse"
		});
	}

}).apply( this, [ jQuery ]);

// Modal
(function( $ ) {

	'use strict';

	if ( $.isFunction( $.fn['magnificPopup'] ) ) {
			$('.modal-dismiss').on('click', function (e) {
				$.magnificPopup.close();
			});

	}

}).apply( this, [ jQuery ]);

// Lightbox
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'magnificPopup' ]) ) {

		$(function() {
			$('[data-plugin-lightbox], .lightbox:not(.manual)').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-lightbox') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clLightbox(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Slider
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'slider' ]) ) {

		$(function() {
			$('[data-plugin-slider]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-slider') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clSlider(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Carousel
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'owlCarousel' ]) ) {

		$(function() {
			$('[data-plugin-carousel]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-carousel') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clCarousel(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Animations
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'appear' ]) ) {

		$(function() {
			$('[data-plugin-animation], [data-appear-animation]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-animation') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clAnimation(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Autosize
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'autosize' ]) ) {

		$(function() {
			$('[data-plugin-autosize]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-autosize') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clAutoSize(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Fileinput
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'fileinput' ]) ) {

		$(function() {
			$('[data-plugin-fileinput]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-fileinput') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clFileInput(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Select2
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'select2' ]) ) {

		$(function() {
			$('.custom-select, [data-plugin-select2]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-select2') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clSelect2(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Masked Input
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'mask' ]) ) {

		$(function() {
			$('[data-plugin-masked-input]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-masked-input') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clMaskedInput(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Datepicker
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'datepicker' ]) ) {

		$(function() {
			$('[data-plugin-datepicker]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-datepicker') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clDatepicker(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Timepicker
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'timepicker' ]) ) {

		$(function() {
			$('[data-plugin-timepicker]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-timepicker') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clTimepicker(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Colorpicker
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'colorpicker' ]) ) {

		$(function() {
			$('[data-plugin-colorpicker]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-colorpicker') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clColorpicker(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// MaxLength
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'maxlength' ]) ) {

		$(function() {
			$('[data-plugin-maxlength]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-maxlength') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clMaxLength(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// CodeMirror
(function( $ ) {

	'use strict';

	if ( typeof CodeMirror !== 'undefined' ) {

		$(function() {
			$('[data-plugin-codemirror]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-codemirror') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clCodeMirror(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Summernote
(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'summernote' ]) ) {
		$(function() {
			$('[data-plugin-summernote]').each(function() {
				var $this = $( this );
				var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-summernote') : {} );
				var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
				$this.clSummernote(options);
			});
		});

	}

}).apply(this, [ jQuery ]);

// Data Tables - Config
(function($) {

	'use strict';

	// we overwrite initialize of all datatables here
	// because we want to use select2, give search input a bootstrap look
	// keep in mind if you overwrite this fnInitComplete somewhere,
	// you should run the code inside this function to keep functionality.
	//
	// there's no better way to do this at this time :(
	if ( $.isFunction( $.fn[ 'dataTable' ] ) ) {

		$.extend(true, $.fn.dataTable.defaults, {
			sDom: "<'row datatables-header form-inline'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>r><'table-responsive't><'row datatables-footer'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>",
			oLanguage: {
				sLengthMenu: '_MENU_ records per page',
				sProcessing: '<i class="fa fa-spinner fa-spin"></i> Loading'
			},
			fnInitComplete: function( settings, json ) {
				// select 2
				if ( $.isFunction( $.fn[ 'select2' ] ) ) {
					$('.dataTables_length select', settings.nTableWrapper).select2({
						minimumResultsForSearch: -1
					});
				}

				// search
				var $input = $('.dataTables_filter input', settings.nTableWrapper)
					.attr({
						placeholder: 'Search...'
					});
				$('.dataTables_filter label', settings.nTableWrapper).contents().filter(function(){  return this.nodeType != 1;}).remove();
			}
		});

	}

}).apply( this, [ jQuery ]);

// UI sortable
(function($) {

	'use strict';

	if ( $.isFunction($.fn[ 'sortable' ]) ) {
		$('.ui-sortable').sortable();
	}

}).apply( this, [ jQuery ]);

// Mailbox helper
(function($) {

	'use strict';

	/* Select all */
	$('#mbSelectAll').on('click', function( e ) {
		e.preventDefault();
		var $this = $(this);
		var $label = $this.find('> span');
		var $checks = $('.col-sender input[type=checkbox]');
		
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
			
	/* Toggle star */
	$('.mailbox-email .panel-actions').on('click', '.fa-star-o, .fa-star', function(){
		if($(this).hasClass('fa-star-o')){
			$(this).removeClass('fa-star-o').addClass('fa-star');
		}else{
			$(this).removeClass('fa-star').addClass('fa-star-o');
		}
	});
	
	/* Toggle offline */
	$('.widget-chat').on('click', '.chat-toggle', function(e){
		e.preventDefault();
		var $this = $(this);
		var $chat = $this.closest('.widget-chat');
		var visible = $chat.find('li.offline').is(':visible');

		if(visible) {
			$chat.find('li.offline').hide();
			$this.text($this.data('show-text'));
		} else {
			$chat.find('li.offline').show();
			$this.text($this.data('hide-text'));
		}
	});
	
}).apply( this, [ jQuery ]);
