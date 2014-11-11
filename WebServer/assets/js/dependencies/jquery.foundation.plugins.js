var thb_easing = [0.75, 0, 0.175, 1];

// Accordion

;(function ($, window, undefined){
  'use strict';

  $.fn.foundationAccordion = function (options) {
  	
    $('.accordion', this).each(function() {
    	var that = $(this),
    			active = ( !(that.data('active-tab')) ? 1 : that.data('active-tab'));
    	
    	that.find('li').eq(active -1).addClass('active');
    	
    	that.find('li').on('click.fndtn', function () {
    		var p = $(this).parent(),
    				flyout = $(this).children('.content').first(),
    				active = p.data('active');
    	  $('.content', p).not(flyout).slideUp(400, $.bez(thb_easing), function() {
    	  	$(this).parent('li').removeClass('active'); //changed this
    	  });
    	  flyout.slideDown({ 
    	  	duration: '400',
    	  	easing: $.bez(thb_easing)
    	  }).parent('li').addClass('active');
    	});
    });

  };

})( jQuery, this );

// Alerts

;(function ($, window, undefined) {
  'use strict';
  
  $.fn.foundationAlerts = function (options) {
    var settings = $.extend({
      callback: $.noop
    }, options);
    
    $(document).on("click", ".notification-box a.close", function (e) {
      e.preventDefault();
      $(this).closest(".notification-box").fadeOut(function () {
        $(this).remove();
        // Do something else after the alert closes
        settings.callback();
      });
    });
    
  };

})(jQuery, this);


// Tabs

;(function ($, window, undefined) {
  'use strict';

  $.fn.foundationTabs = function (options) {

    var settings = $.extend({
      callback: $.noop
    }, options);

    var activateTab = function ($tab) {
      var $activeTab = $tab.closest('dl').find('dd.active'),
          target = $tab.children('a').attr("href"),
          hasHash = /^#/.test(target),
          contentLocation = '';

      if (hasHash) {
        contentLocation = target + 'Tab';

        // Strip off the current url that IE adds
        contentLocation = contentLocation.replace(/^.+#/, '#');

        //Show Tab Content
        $(contentLocation).closest('.tabs-content').children('li').removeClass('active').hide();
        $(contentLocation).css('display', 'block').addClass('active');
      }

      //Make Tab Active
      $activeTab.removeClass('active');
      $tab.addClass('active');
    };

    $(document).on('click.fndtn', 'dl.tabs dd a', function (event){
      activateTab($(this).parent('dd'));
    });

		$(document).find('dl.tabs').each(function() {
			activateTab($(this).find('dd:eq(0)'));
		});
  };

})(jQuery, this);

jQuery(document).ready(function($) {
	
	$.fn.foundationAlerts					? $(document).foundationAlerts() : null;
	$.fn.foundationAccordion			? $(document).foundationAccordion() : null;
	$.fn.foundationTabs						? $(document).foundationTabs() : null;

});

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */

(function($) {

	$.belowthefold = function(element, settings) {
		var fold = $(window).height() + $(window).scrollTop();
		return fold <= $(element).offset().top - settings.threshold;
	};
	$.abovethetop = function(element, settings) {
		var top = $(window).scrollTop();
		return top >= $(element).offset().top + $(element).height() - settings.threshold;
	};
	$.rightofscreen = function(element, settings) {
		var fold = $(window).width() + $(window).scrollLeft();
		return fold <= $(element).offset().left - settings.threshold;
	};
	$.leftofscreen = function(element, settings) {
		var left = $(window).scrollLeft();
		return left >= $(element).offset().left + $(element).width() - settings.threshold;
	};
	$.inviewport = function(element, settings) {
		return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};

	$.extend($.expr[':'], {
		"below-the-fold": function(a, i, m) {
			return $.belowthefold(a, {threshold : 0});
		},
		"above-the-top": function(a, i, m) {
			return $.abovethetop(a, {threshold : 0});
		},
		"left-of-screen": function(a, i, m) {
			return $.leftofscreen(a, {threshold : 0});
		},
		"right-of-screen": function(a, i, m) {
			return $.rightofscreen(a, {threshold : 0});
		},
		"in-viewport": function(a, i, m) {
			return $.inviewport(a, {threshold : -30});
		}
	});

})(jQuery);

// Images Loaded
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);

/*!
 * Bez @VERSION
 * http://github.com/rdallasgray/bez
 * 
 * A plugin to convert CSS3 cubic-bezier co-ordinates to jQuery-compatible easing functions
 * 
 * With thanks to Nikolay Nemshilov for clarification on the cubic-bezier maths
 * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
 * 
 * Copyright @YEAR Robert Dallas Gray. All rights reserved.
 * Provided under the FreeBSD license: https://github.com/rdallasgray/bez/blob/master/LICENSE.txt
*/
jQuery.extend({ bez: function(coOrdArray) {
	var encodedFuncName = "bez_" + jQuery.makeArray(arguments).join("_").replace(/\./g, "p");
	if (typeof jQuery.easing[encodedFuncName] !== "function") {
		var	polyBez = function(p1, p2) {
			var A = [null, null], B = [null, null], C = [null, null],
				bezCoOrd = function(t, ax) {
					C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
					return t * (C[ax] + t * (B[ax] + t * A[ax]));
				},
				xDeriv = function(t) {
					return C[0] + t * (2 * B[0] + 3 * A[0] * t);
				},
				xForT = function(t) {
					var x = t, i = 0, z;
					while (++i < 14) {
						z = bezCoOrd(x, 0) - t;
						if (Math.abs(z) < 1e-3) break;
						x -= z / xDeriv(x);
					}
					return x;
				};
				return function(t) {
					return bezCoOrd(xForT(t), 1);
				}
		};
		jQuery.easing[encodedFuncName] = function(x, t, b, c, d) {
			return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t/d) + b;
		}
	}
	return encodedFuncName;
}});
/*
Firefox super responsive scroll (c) Keith Clark - MIT Licensed
*/
(function(doc) {

  var root = doc.documentElement;

  // Not ideal, but better than UA sniffing.
  if ("MozAppearance" in root.style) {

    // determine the vertical scrollbar width
    var scrollbarWidth = root.clientWidth;
    root.style.overflow = "scroll";
    scrollbarWidth -= root.clientWidth;
    root.style.overflow = "";
    
    // create a synthetic scroll event
    var scrollEvent = doc.createEvent("UIEvent")
    scrollEvent.initEvent("scroll", true, true);
    
    // event dispatcher
    function scrollHandler() {
      doc.dispatchEvent(scrollEvent)
    }

    // detect mouse events in the document scrollbar track
    doc.addEventListener("mousedown", function(e) {
      if (e.clientX > root.clientWidth - scrollbarWidth) {
        doc.addEventListener("mousemove", scrollHandler, false);
        doc.addEventListener("mouseup", function() {
          doc.removeEventListener("mouseup", arguments.callee, false);
          doc.removeEventListener("mousemove", scrollHandler, false);
        }, false)
      }
    }, false)

    // override mouse wheel behaviour.
    doc.addEventListener("DOMMouseScroll", function(e) {
      // Don't disable hot key behaviours
      if (!e.ctrlKey && !e.shiftKey) {
        root.scrollTop += e.detail * 16;
        scrollHandler.call(this, e);
        e.preventDefault()
      }
    }, false)
 
  }
})(document);
/**
* jquery.matchHeight-min.js v0.5.1
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(b){b.fn.matchHeight=function(a){if("remove"===a){var d=this;this.css("height","");b.each(b.fn.matchHeight._groups,function(b,a){a.elements=a.elements.not(d)});return this}if(1>=this.length)return this;a="undefined"!==typeof a?a:!0;b.fn.matchHeight._groups.push({elements:this,byRow:a});b.fn.matchHeight._apply(this,a);return this};b.fn.matchHeight._apply=function(a,d){var c=b(a),e=[c];d&&(c.css({display:"block","padding-top":"0","padding-bottom":"0","border-top":"0","border-bottom":"0",height:"100px"}),
e=k(c),c.css({display:"","padding-top":"","padding-bottom":"","border-top":"","border-bottom":"",height:""}));b.each(e,function(a,c){var d=b(c),e=0;d.each(function(){var a=b(this);a.css({display:"block",height:""});a.outerHeight(!1)>e&&(e=a.outerHeight(!1));a.css({display:""})});d.each(function(){var a=b(this),c=0;"border-box"!==a.css("box-sizing")&&(c+=g(a.css("border-top-width"))+g(a.css("border-bottom-width")),c+=g(a.css("padding-top"))+g(a.css("padding-bottom")));a.css("height",e-c)})});return this};
b.fn.matchHeight._applyDataApi=function(){var a={};b("[data-match-height], [data-mh]").each(function(){var d=b(this),c=d.attr("data-match-height");a[c]=c in a?a[c].add(d):d});b.each(a,function(){this.matchHeight(!0)})};b.fn.matchHeight._groups=[];b.fn.matchHeight._throttle=80;var h=-1,f=-1;b.fn.matchHeight._update=function(a){if(a&&"resize"===a.type){a=b(window).width();if(a===h)return;h=a}-1===f&&(f=setTimeout(function(){b.each(b.fn.matchHeight._groups,function(){b.fn.matchHeight._apply(this.elements,
this.byRow)});f=-1},b.fn.matchHeight._throttle))};b(b.fn.matchHeight._applyDataApi);b(window).bind("load resize orientationchange",b.fn.matchHeight._update);var k=function(a){var d=null,c=[];b(a).each(function(){var a=b(this),f=a.offset().top-g(a.css("margin-top")),h=0<c.length?c[c.length-1]:null;null===h?c.push(a):1>=Math.floor(Math.abs(d-f))?c[c.length-1]=h.add(a):c.push(a);d=f});return c},g=function(a){return parseFloat(a)||0}})(jQuery);

/*!
 * Variations Plugin
 */
;(function ( $, window, document, undefined ) {

	$.fn.wc_variation_form = function () {

		$.fn.wc_variation_form.find_matching_variations = function( product_variations, settings ) {
			var matching = [];

			for ( var i = 0; i < product_variations.length; i++ ) {
				var variation = product_variations[i];
				var variation_id = variation.variation_id;

				if ( $.fn.wc_variation_form.variations_match( variation.attributes, settings ) ) {
					matching.push( variation );
				}
			}

			return matching;
		};

		$.fn.wc_variation_form.variations_match = function( attrs1, attrs2 ) {
			var match = true;

			for ( var attr_name in attrs1 ) {
				if ( attrs1.hasOwnProperty( attr_name ) ) {
					var val1 = attrs1[ attr_name ];
					var val2 = attrs2[ attr_name ];

					if ( val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2 ) {
						match = false;
					}
				}
			}

			return match;
		};

		// Unbind any existing events
		this.unbind( 'check_variations update_variation_values found_variation' );
		this.find( '.reset_variations' ).unbind( 'click' );
		this.find( '.variations select' ).unbind( 'change focusin' );

		// Bind events
		$form = this

			// On clicking the reset variation button
			.on( 'click', '.reset_variations', function( event ) {

				$( this ).closest( '.variations_form' ).find( '.variations select' ).val( '' ).change();

				var $sku = $( this ).closest( '.product' ).find( '.sku' ),
					$weight = $( this ).closest( '.product' ).find( '.product_weight' ),
					$dimensions = $( this ).closest( '.product' ).find( '.product_dimensions' );

				if ( $sku.attr( 'data-o_sku' ) )
					$sku.text( $sku.attr( 'data-o_sku' ) );

				if ( $weight.attr( 'data-o_weight' ) )
					$weight.text( $weight.attr( 'data-o_weight' ) );

				if ( $dimensions.attr( 'data-o_dimensions' ) )
					$dimensions.text( $dimensions.attr( 'data-o_dimensions' ) );

				return false;
			} )

			// Upon changing an option
			.on( 'change', '.variations select', function( event ) {

				$variation_form = $( this ).closest( '.variations_form' );
				$variation_form.find( 'input[name=variation_id]' ).val( '' ).change();

				$variation_form
					.trigger( 'woocommerce_variation_select_change' )
					.trigger( 'check_variations', [ '', false ] );

				$( this ).blur();

				if( $().uniform && $.isFunction( $.uniform.update ) ) {
					$.uniform.update();
				}

			} )

			// Upon gaining focus
			.on( 'focusin touchstart', '.variations select', function( event ) {

				$variation_form = $( this ).closest( '.variations_form' );

				$variation_form
					.trigger( 'woocommerce_variation_select_focusin' )
					.trigger( 'check_variations', [ $( this ).attr( 'name' ), true ] );

			} )

			// Check variations
			.on( 'check_variations', function( event, exclude, focus ) {
				var all_set = true,
					any_set = false,
					showing_variation = false,
					current_settings = {},
					$variation_form = $( this ),
					$reset_variations = $variation_form.find( '.reset_variations' );

				$variation_form.find( '.variations select' ).each( function() {

					if ( $( this ).val().length === 0 ) {
						all_set = false;
					} else {
						any_set = true;
					}

					if ( exclude && $( this ).attr( 'name' ) === exclude ) {

						all_set = false;
						current_settings[$( this ).attr( 'name' )] = '';

					} else {

						// Encode entities
						value = $( this ).val();

						// Add to settings array
						current_settings[ $( this ).attr( 'name' ) ] = value;
					}

				});

				var product_id = parseInt( $variation_form.data( 'product_id' ) ),
					all_variations = $variation_form.data( 'product_variations' );

				// Fallback to window property if not set - backwards compat
				if ( ! all_variations )
					all_variations = window.product_variations.product_id;
				if ( ! all_variations )
					all_variations = window.product_variations;
				if ( ! all_variations )
					all_variations = window['product_variations_' + product_id ];

				var matching_variations = $.fn.wc_variation_form.find_matching_variations( all_variations, current_settings );

				if ( all_set ) {

					var variation = matching_variations.shift();

					if ( variation ) {

						// Found - set ID
						$variation_form
							.find( 'input[name=variation_id]' )
							.val( variation.variation_id )
							.change();

						$variation_form.trigger( 'found_variation', [ variation ] );

					} else {

						// Nothing found - reset fields
						$variation_form.find( '.variations select' ).val( '' );

						if ( ! focus )
							$variation_form.trigger( 'reset_image' );

						alert( wc_add_to_cart_variation_params.i18n_no_matching_variations_text );

					}

				} else {

					$variation_form.trigger( 'update_variation_values', [ matching_variations ] );

					if ( ! focus )
						$variation_form.trigger( 'reset_image' );

					if ( ! exclude ) {
						$variation_form.find( '.single_variation_wrap' ).slideUp( 200 );
					}

				}

				if ( any_set ) {

					if ( $reset_variations.css( 'visibility' ) === 'hidden' )
						$reset_variations.css( 'visibility', 'visible' ).hide().fadeIn();

				} else {

					$reset_variations.css( 'visibility', 'hidden' );

				}

			} )

			// Reset product image
			.on( 'reset_image', function( event ) {

				var $product = $(this).closest( '.product' ),
					$product_img = $product.find( 'div.images img:eq(0)' ),
					$product_link = $product.find( 'div.images a.zoom:eq(0)' ),
					o_src = $product_img.attr( 'data-o_src' ),
					o_title = $product_img.attr( 'data-o_title' ),
					o_alt = $product_img.attr( 'data-o_alt' ),
					o_href = $product_link.attr( 'data-o_href' );

				if ( o_src !== undefined ) {
					$product_img
						.attr( 'src', o_src );
				}

				if ( o_href !== undefined ) {
					$product_link
						.attr( 'href', o_href );
				}

				if ( o_title !== undefined ) {
					$product_img
						.attr( 'title', o_title );
					$product_link
						.attr( 'title', o_title );
				}

				if ( o_alt !== undefined ) {
					$product_img
						.attr( 'alt', o_alt );
				}
			} )

			// Disable option fields that are unavaiable for current set of attributes
			.on( 'update_variation_values', function( event, variations ) {

				$variation_form = $( this ).closest( '.variations_form' );

				// Loop through selects and disable/enable options based on selections
				$variation_form.find( '.variations select' ).each( function( index, el ) {

					current_attr_select = $( el );

					// Reset options
					if ( ! current_attr_select.data( 'attribute_options' ) )
						current_attr_select.data( 'attribute_options', current_attr_select.find( 'option:gt(0)' ).get() );

					current_attr_select.find( 'option:gt(0)' ).remove();
					current_attr_select.append( current_attr_select.data( 'attribute_options' ) );
					current_attr_select.find( 'option:gt(0)' ).removeClass( 'active' );

					// Get name
					var current_attr_name = current_attr_select.attr( 'name' );

					// Loop through variations
					for ( var num in variations ) {

						if ( typeof( variations[ num ] ) != 'undefined' ) {

							var attributes = variations[ num ].attributes;

							for ( var attr_name in attributes ) {
								if ( attributes.hasOwnProperty( attr_name ) ) {
									var attr_val = attributes[ attr_name ];

									if ( attr_name == current_attr_name ) {

										if ( attr_val ) {

											// Decode entities
											attr_val = $( '<div/>' ).html( attr_val ).text();

											// Add slashes
											attr_val = attr_val.replace( /'/g, "\\'" );
											attr_val = attr_val.replace( /"/g, "\\\"" );

											// Compare the meerkat
											current_attr_select.find( 'option[value="' + attr_val + '"]' ).addClass( 'active' );

										} else {

											current_attr_select.find( 'option:gt(0)' ).addClass( 'active' );

										}
									}
								}
							}
						}
					}

					// Detach inactive
					current_attr_select.find( 'option:gt(0):not(.active)' ).remove();

				});

				// Custom event for when variations have been updated
				$variation_form.trigger( 'woocommerce_update_variation_values' );

			} )

			// Show single variation details (price, stock, image)
			.on( 'found_variation', function( event, variation ) {
				var $variation_form = $( this ),
					$product = $( this ).closest( '.product' ),
					$product_img = $product.find( 'div.images img:eq(0)' ),
					$product_link = $product.find( 'div.images a.zoom:eq(0)' ),
					o_src = $product_img.attr( 'data-o_src' ),
					o_title = $product_img.attr( 'data-o_title' ),
					o_alt = $product_img.attr( 'data-o_alt' ),
					o_href = $product_link.attr( 'data-o_href' ),
					variation_image = variation.image_src,
					variation_link  = variation.image_link,
					variation_title = variation.image_title,
					variation_alt = variation.image_alt;

				$variation_form.find( '.variations_button' ).show();
				$variation_form.find( '.single_variation' ).html( variation.price_html + variation.availability_html );

				if ( o_src === undefined ) {
					o_src = ( ! $product_img.attr( 'src' ) ) ? '' : $product_img.attr( 'src' );
					$product_img.attr( 'data-o_src', o_src );
				}

				if ( o_href === undefined ) {
					o_href = ( ! $product_link.attr( 'href' ) ) ? '' : $product_link.attr( 'href' );
					$product_link.attr( 'data-o_href', o_href );
				}

				if ( o_title === undefined ) {
					o_title = ( ! $product_img.attr( 'title' ) ) ? '' : $product_img.attr( 'title' );
					$product_img.attr( 'data-o_title', o_title );
				}

				if ( o_alt === undefined ) {
					o_alt = ( ! $product_img.attr( 'alt' ) ) ? '' : $product_img.attr( 'alt' );
					$product_img.attr( 'data-o_alt', o_alt );
				}

				if ( variation_image && variation_image.length > 1 ) {
					$product_img
						.attr( 'src', variation_image )
						.attr( 'alt', variation_alt )
						.attr( 'title', variation_title );
					$product_link
						.attr( 'href', variation_link )
						.attr( 'title', variation_title );
				} else {
					$product_img
						.attr( 'src', o_src )
						.attr( 'alt', o_alt )
						.attr( 'title', o_title );
					$product_link
						.attr( 'href', o_href )
						.attr( 'title', o_title );
				}

				var $single_variation_wrap = $variation_form.find( '.single_variation_wrap' ),
					$sku = $product.find( '.product_meta' ).find( '.sku' ),
					$weight = $product.find( '.product_weight' ),
					$dimensions = $product.find( '.product_dimensions' );

				if ( ! $sku.attr( 'data-o_sku' ) )
					$sku.attr( 'data-o_sku', $sku.text() );

				if ( ! $weight.attr( 'data-o_weight' ) )
					$weight.attr( 'data-o_weight', $weight.text() );

				if ( ! $dimensions.attr( 'data-o_dimensions' ) )
					$dimensions.attr( 'data-o_dimensions', $dimensions.text() );

				if ( variation.sku ) {
					$sku.text( variation.sku );
				} else {
					$sku.text( $sku.attr( 'data-o_sku' ) );
				}

				if ( variation.weight ) {
					$weight.text( variation.weight );
				} else {
					$weight.text( $weight.attr( 'data-o_weight' ) );
				}

				if ( variation.dimensions ) {
					$dimensions.text( variation.dimensions );
				} else {
					$dimensions.text( $dimensions.attr( 'data-o_dimensions' ) );
				}

				$single_variation_wrap.find( '.quantity' ).show();

				if ( ! variation.is_purchasable || ! variation.is_in_stock || ! variation.variation_is_visible ) {
					$variation_form.find( '.variations_button' ).hide();
				}

				if ( ! variation.variation_is_visible ) {
					$variation_form.find( '.single_variation' ).html( '<p>' + wc_add_to_cart_variation_params.i18n_unavailable_text + '</p>' );
				}

				if ( variation.min_qty )
					$single_variation_wrap.find( 'input[name=quantity]' ).attr( 'min', variation.min_qty ).val( variation.min_qty );
				else
					$single_variation_wrap.find( 'input[name=quantity]' ).removeAttr( 'min' );

				if ( variation.max_qty )
					$single_variation_wrap.find( 'input[name=quantity]' ).attr( 'max', variation.max_qty );
				else
					$single_variation_wrap.find( 'input[name=quantity]' ).removeAttr( 'max' );

				if ( variation.is_sold_individually === 'yes' ) {
					$single_variation_wrap.find( 'input[name=quantity]' ).val( '1' );
					$single_variation_wrap.find( '.quantity' ).hide();
				}

				$single_variation_wrap.slideDown( 200 ).trigger( 'show_variation', [ variation ] );

			});

		$form.trigger( 'wc_variation_form' );

		return $form;
	};

	$( function() {

		// wc_add_to_cart_variation_params is required to continue, ensure the object exists
		if ( typeof wc_add_to_cart_variation_params === 'undefined' )
			return false;

		$( '.variations_form' ).wc_variation_form();
		$( '.variations_form .variations select' ).change();
	});

})( jQuery, window, document );
 
 /*! perfect-scrollbar - v0.4.8
 * http://noraesae.github.com/perfect-scrollbar/
 * Copyright (c) 2014 Hyeonje Jun; Licensed MIT */
 "use strict";(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var n={wheelSpeed:10,wheelPropagation:!1,minScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0},t=function(){var e=0;return function(){var n=e;return e+=1,".perfect-scrollbar-"+n}}();e.fn.perfectScrollbar=function(o,r){return this.each(function(){var l=e.extend(!0,{},n),s=e(this);if("object"==typeof o?e.extend(!0,l,o):r=o,"update"===r)return s.data("perfect-scrollbar-update")&&s.data("perfect-scrollbar-update")(),s;if("destroy"===r)return s.data("perfect-scrollbar-destroy")&&s.data("perfect-scrollbar-destroy")(),s;if(s.data("perfect-scrollbar"))return s.data("perfect-scrollbar");s.addClass("ps-container");var a,i,c,u,p,d,f,h,v,b,g=e("<div class='ps-scrollbar-x-rail'></div>").appendTo(s),m=e("<div class='ps-scrollbar-y-rail'></div>").appendTo(s),w=e("<div class='ps-scrollbar-x'></div>").appendTo(g),T=e("<div class='ps-scrollbar-y'></div>").appendTo(m),L=parseInt(g.css("bottom"),10),y=parseInt(m.css("right"),10),S=t(),I=function(e,n){var t=e+n,o=u-v;b=0>t?0:t>o?o:t;var r=parseInt(b*(d-u)/(u-v),10);s.scrollTop(r),g.css({bottom:L-r})},D=function(e,n){var t=e+n,o=c-f;h=0>t?0:t>o?o:t;var r=parseInt(h*(p-c)/(c-f),10);s.scrollLeft(r),m.css({right:y-r})},x=function(e){return l.minScrollbarLength&&(e=Math.max(e,l.minScrollbarLength)),e},k=function(){g.css({left:s.scrollLeft(),bottom:L-s.scrollTop(),width:c,display:a?"inherit":"none"}),m.css({top:s.scrollTop(),right:y-s.scrollLeft(),height:u,display:i?"inherit":"none"}),w.css({left:h,width:f}),T.css({top:b,height:v})},X=function(){c=s.width(),u=s.height(),p=s.prop("scrollWidth"),d=s.prop("scrollHeight"),!l.suppressScrollX&&p>c+l.scrollXMarginOffset?(a=!0,f=x(parseInt(c*c/p,10)),h=parseInt(s.scrollLeft()*(c-f)/(p-c),10)):(a=!1,f=0,h=0,s.scrollLeft(0)),!l.suppressScrollY&&d>u+l.scrollYMarginOffset?(i=!0,v=x(parseInt(u*u/d,10)),b=parseInt(s.scrollTop()*(u-v)/(d-u),10)):(i=!1,v=0,b=0,s.scrollTop(0)),b>=u-v&&(b=u-v),h>=c-f&&(h=c-f),k()},C=function(){var n,t;w.bind("mousedown"+S,function(e){t=e.pageX,n=w.position().left,g.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+S,function(e){g.hasClass("in-scrolling")&&(D(n,e.pageX-t),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+S,function(){g.hasClass("in-scrolling")&&g.removeClass("in-scrolling")}),n=t=null},Y=function(){var n,t;T.bind("mousedown"+S,function(e){t=e.pageY,n=T.position().top,m.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+S,function(e){m.hasClass("in-scrolling")&&(I(n,e.pageY-t),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+S,function(){m.hasClass("in-scrolling")&&m.removeClass("in-scrolling")}),n=t=null},P=function(e,n){var t=s.scrollTop();if(0===e){if(!i)return!1;if(0===t&&n>0||t>=d-u&&0>n)return!l.wheelPropagation}var o=s.scrollLeft();if(0===n){if(!a)return!1;if(0===o&&0>e||o>=p-c&&e>0)return!l.wheelPropagation}return!0},M=function(){var e=!1;s.bind("mousewheel"+S,function(n,t,o,r){l.useBothWheelAxes?i&&!a?r?s.scrollTop(s.scrollTop()-r*l.wheelSpeed):s.scrollTop(s.scrollTop()+o*l.wheelSpeed):a&&!i&&(o?s.scrollLeft(s.scrollLeft()+o*l.wheelSpeed):s.scrollLeft(s.scrollLeft()-r*l.wheelSpeed)):(s.scrollTop(s.scrollTop()-r*l.wheelSpeed),s.scrollLeft(s.scrollLeft()+o*l.wheelSpeed)),X(),e=P(o,r),e&&n.preventDefault()}),s.bind("MozMousePixelScroll"+S,function(n){e&&n.preventDefault()})},O=function(){var n=!1;s.bind("mouseenter"+S,function(){n=!0}),s.bind("mouseleave"+S,function(){n=!1});var t=!1;e(document).bind("keydown"+S,function(e){if(n){var o=0,r=0;switch(e.which){case 37:o=-3;break;case 38:r=3;break;case 39:o=3;break;case 40:r=-3;break;case 33:r=9;break;case 32:case 34:r=-9;break;case 35:r=-u;break;case 36:r=u;break;default:return}s.scrollTop(s.scrollTop()-r*l.wheelSpeed),s.scrollLeft(s.scrollLeft()+o*l.wheelSpeed),t=P(o,r),t&&e.preventDefault()}})},E=function(){var e=function(e){e.stopPropagation()};T.bind("click"+S,e),m.bind("click"+S,function(e){var n=parseInt(v/2,10),t=e.pageY-m.offset().top-n,o=u-v,r=t/o;0>r?r=0:r>1&&(r=1),s.scrollTop((d-u)*r)}),w.bind("click"+S,e),g.bind("click"+S,function(e){var n=parseInt(f/2,10),t=e.pageX-g.offset().left-n,o=c-f,r=t/o;0>r?r=0:r>1&&(r=1),s.scrollLeft((p-c)*r)})},A=function(){var n=function(e,n){s.scrollTop(s.scrollTop()-n),s.scrollLeft(s.scrollLeft()-e),X()},t={},o=0,r={},l=null,a=!1;e(window).bind("touchstart"+S,function(){a=!0}),e(window).bind("touchend"+S,function(){a=!1}),s.bind("touchstart"+S,function(e){var n=e.originalEvent.targetTouches[0];t.pageX=n.pageX,t.pageY=n.pageY,o=(new Date).getTime(),null!==l&&clearInterval(l),e.stopPropagation()}),s.bind("touchmove"+S,function(e){if(!a&&1===e.originalEvent.targetTouches.length){var l=e.originalEvent.targetTouches[0],s={};s.pageX=l.pageX,s.pageY=l.pageY;var i=s.pageX-t.pageX,c=s.pageY-t.pageY;n(i,c),t=s;var u=(new Date).getTime();r.x=i/(u-o),r.y=c/(u-o),o=u,e.preventDefault()}}),s.bind("touchend"+S,function(){clearInterval(l),l=setInterval(function(){return.01>Math.abs(r.x)&&.01>Math.abs(r.y)?(clearInterval(l),void 0):(n(30*r.x,30*r.y),r.x*=.8,r.y*=.8,void 0)},10)})},j=function(){s.bind("scroll"+S,function(){X()})},W=function(){s.unbind(S),e(window).unbind(S),e(document).unbind(S),s.data("perfect-scrollbar",null),s.data("perfect-scrollbar-update",null),s.data("perfect-scrollbar-destroy",null),w.remove(),T.remove(),g.remove(),m.remove(),w=T=c=u=p=d=f=h=L=v=b=y=null},H=function(n){s.addClass("ie").addClass("ie"+n);var t=function(){var n=function(){e(this).addClass("hover")},t=function(){e(this).removeClass("hover")};s.bind("mouseenter"+S,n).bind("mouseleave"+S,t),g.bind("mouseenter"+S,n).bind("mouseleave"+S,t),m.bind("mouseenter"+S,n).bind("mouseleave"+S,t),w.bind("mouseenter"+S,n).bind("mouseleave"+S,t),T.bind("mouseenter"+S,n).bind("mouseleave"+S,t)},o=function(){k=function(){w.css({left:h+s.scrollLeft(),bottom:L,width:f}),T.css({top:b+s.scrollTop(),right:y,height:v}),w.hide().show(),T.hide().show()}};6===n&&(t(),o())},B="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,K=function(){var e=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);e&&"msie"===e[1]&&H(parseInt(e[2],10)),X(),j(),C(),Y(),E(),B&&A(),s.mousewheel&&M(),l.useKeyboard&&O(),s.data("perfect-scrollbar",s),s.data("perfect-scrollbar-update",X),s.data("perfect-scrollbar-destroy",W)};return K(),s})}}),function(e){function n(n){var t=n||window.event,o=[].slice.call(arguments,1),r=0,l=0,s=0;return n=e.event.fix(t),n.type="mousewheel",t.wheelDelta&&(r=t.wheelDelta/120),t.detail&&(r=-t.detail/3),s=r,void 0!==t.axis&&t.axis===t.HORIZONTAL_AXIS&&(s=0,l=-1*r),void 0!==t.wheelDeltaY&&(s=t.wheelDeltaY/120),void 0!==t.wheelDeltaX&&(l=-1*t.wheelDeltaX/120),o.unshift(n,r,l,s),(e.event.dispatch||e.event.handle).apply(this,o)}var t=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var o=t.length;o;)e.event.fixHooks[t[--o]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=t.length;e;)this.addEventListener(t[--e],n,!1);else this.onmousewheel=n},teardown:function(){if(this.removeEventListener)for(var e=t.length;e;)this.removeEventListener(t[--e],n,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(jQuery);
 
 /*! Sidr - v1.2.1 - 2013-11-06
  * https://github.com/artberri/sidr
  * Copyright (c) 2013 Alberto Varela; Licensed MIT */
 (function(e){var t=!1,i=!1,n={isUrl:function(e){var t=RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return t.test(e)?!0:!1},loadContent:function(e,t){e.html(t)},addPrefix:function(e){var t=e.attr("id"),i=e.attr("class");"string"==typeof t&&""!==t&&e.attr("id",t.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1")),"string"==typeof i&&""!==i&&"sidr-inner"!==i&&e.attr("class",i.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1")),e.removeAttr("style")},execute:function(n,s,a){"function"==typeof s?(a=s,s="sidr"):s||(s="sidr");var r,d,l,c=e("#"+s),u=e(c.data("body")),f=e("html"),p=c.outerWidth(!0),g=c.data("speed"),h=c.data("side"),m=c.data("displace"),v=c.data("onOpen"),y=c.data("onClose"),x="sidr"===s?"sidr-open":"sidr-open "+s+"-open";if("open"===n||"toggle"===n&&!c.is(":visible")){if(c.is(":visible")||t)return;if(i!==!1)return o.close(i,function(){o.open(s)}),void 0;t=!0,"left"===h?(r={left:p+"px"},d={left:"0px"}):(r={right:p+"px"},d={right:"0px"}),u.is("body")&&(l=f.scrollTop(),f.css("overflow-x","hidden").scrollTop(l)),m?u.addClass("sidr-animating").css({width:u.width(),position:"absolute"}).animate(r,g,function(){e(this).addClass(x)}):setTimeout(function(){e(this).addClass(x)},g),c.css("display","block").animate(d,g,function(){t=!1,i=s,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),v()}else{if(!c.is(":visible")||t)return;t=!0,"left"===h?(r={left:0},d={left:"-"+p+"px"}):(r={right:0},d={right:"-"+p+"px"}),u.is("body")&&(l=f.scrollTop(),f.removeAttr("style").scrollTop(l)),u.addClass("sidr-animating").animate(r,g).removeClass(x),c.animate(d,g,function(){c.removeAttr("style").hide(),u.removeAttr("style"),e("html").removeAttr("style"),t=!1,i=!1,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),y()}}},o={open:function(e,t){n.execute("open",e,t)},close:function(e,t){n.execute("close",e,t)},toggle:function(e,t){n.execute("toggle",e,t)},toogle:function(e,t){n.execute("toggle",e,t)}};e.sidr=function(t){return o[t]?o[t].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof t&&"string"!=typeof t&&t?(e.error("Method "+t+" does not exist on jQuery.sidr"),void 0):o.toggle.apply(this,arguments)},e.fn.sidr=function(t){var i=e.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,onOpen:function(){},onClose:function(){}},t),s=i.name,a=e("#"+s);if(0===a.length&&(a=e("<div />").attr("id",s).appendTo(e("body"))),a.addClass("sidr").addClass(i.side).data({speed:i.speed,side:i.side,body:i.body,displace:i.displace,onOpen:i.onOpen,onClose:i.onClose}),"function"==typeof i.source){var r=i.source(s);n.loadContent(a,r)}else if("string"==typeof i.source&&n.isUrl(i.source))e.get(i.source,function(e){n.loadContent(a,e)});else if("string"==typeof i.source){var d="",l=i.source.split(",");if(e.each(l,function(t,i){d+='<div class="sidr-inner">'+e(i).html()+"</div>"}),i.renaming){var c=e("<div />").html(d);c.find("*").each(function(t,i){var o=e(i);n.addPrefix(o)}),d=c.html()}n.loadContent(a,d)}else null!==i.source&&e.error("Invalid Sidr Source");return this.each(function(){var t=e(this),i=t.data("sidr");i||(t.data("sidr",s),"ontouchstart"in document.documentElement?(t.bind("touchstart",function(e){e.originalEvent.touches[0],this.touched=e.timeStamp}),t.bind("touchend",function(e){var t=Math.abs(e.timeStamp-this.touched);200>t&&(e.preventDefault(),o.toggle(s))})):t.click(function(e){e.preventDefault(),o.toggle(s)}))})}})(jQuery);
 
 /*!
  * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
  * http://cherne.net/brian/resources/jquery.hoverIntent.html
  *
  * You may use hoverIntent under the terms of the MIT license.
  * Copyright 2007, 2013 Brian Cherne
  */
 (function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery);