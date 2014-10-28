var favicon;
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

;(function ($, window, undefined) {
	'use strict';

	var $doc = $(document),
			win = $(window),
			Modernizr = window.Modernizr,
			thb_easing = [0.75, 0, 0.175, 1];

	var SITE = SITE || {};

	SITE = {
		init: function() {
			var self = this,
					obj;

			for (obj in self) {
				if ( self.hasOwnProperty(obj)) {
					var _method =  self[obj];
					if ( _method.selector !== undefined && _method.init !== undefined ) {
						if ( $(_method.selector).length > 0 ) {
							if ( _method.dependencies !== undefined ) {
								(function(_async) {
									Modernizr.load([
									{
										load: _async.dependencies,
										complete: function () {
											_async.init();
										}
									}]);
								})(_method);
							} else {
								_method.init();
							}
						}
					}
				}
			}
		},
		headRoom: {
			selector: '.header.tofixed',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.clone().addClass('fixed').removeClass('style2').prependTo('#wrapper');

				var fixedmenu = $('.header.fixed');
				win.scroll(function(){
					base.scroll(fixedmenu);
				});
			},
			scroll: function (container) {
				var animationOffset = container.data('offset'),
						wOffset = win.scrollTop(),
						stick = container.data('stick-class'),
						unstick = container.data('unstick-class');

				if (wOffset > animationOffset) {
					container.removeClass(unstick);
					if (!container.hasClass(stick)) {
						setTimeout(function () {
							container.addClass(stick);
						}, 10);
					}
				} else if ((wOffset < animationOffset && (wOffset > 0))) {
					if(container.hasClass(stick)) {
						container.removeClass(stick);
						container.addClass(unstick);
					}
				} else {
					container.removeClass(stick);
					container.removeClass(unstick);
				}
			}
		},
		responsiveNav: {
			selector: '.mobile-toggle',
			init: function() {
				var base = this,
						container = $(base.selector),
						target1 = $('#sidr-main'),
						target2 = $('#mobile-full'),
						parents = target1.find('.mobile-menu>li:has(".sub-menu")>a');

				if (container.hasClass('style1')) {
					container.sidr({
						name: 'sidr-main',
						source: '#sidr-main',
						renaming: false,
						onOpen: function() {
							container.addClass('active');

						},
						onClose: function() {
							container.removeClass('active');
						}
					});
					$('body').on('click',parents.selector, function(){
						var that = $(this);
						target1.find('.active').not(this).removeClass('active').next('.sub-menu').slideUp();

						if (that.hasClass('active')) {
							that.removeClass('active').next('.sub-menu').slideUp();
						} else {
							that.addClass('active').next('.sub-menu').slideDown();
						}

						return false;
					});
					$('#sidr-close').click(function() {
						$.sidr('close', 'sidr-main');
						return false;
					});

					win.resize(function() {
						if( win.width() > 767 ){
							$.sidr('close', 'sidr-main');
						}
					});
				} else if (container.hasClass('style2')) {
                    $('body').on('click', container.selector, function() {
						container.toggleClass('active');
						target2.toggleClass('open');
					});

					target2.find('.close').on('click',function() {
						container.toggleClass('active');
						target2.toggleClass('open');
					});
				}
			}
		},
		navDropdown: {
			selector: '#nav .sf-menu',
			init: function() {
				var base = this,
						container = $(base.selector),
						item = container.find('>li.menu-item-has-children');

					item.each(function() {
						var that = $(this),
								offset = that.offset(),
								dropdown = that.find('>.sub-menu, >.thb_mega_menu_holder'),
								children = that.find('li.menu-item-has-children'),
								menuoffset = 0,
								pageoffset = 0,
								megamenuoffsetleft = 0,
								megamenuoffsetright = 0;

						that.hoverIntent(
							function () {
								that.addClass('sfHover');
								menuoffset = Math.floor(parseInt($(this).find('>a').css('margin-left')) - 18);
								pageoffset = Math.floor(((win.width() - $('.row').width()) / 2 ) +15);
								offset.right = (win.width() - (offset.left + that.outerWidth()));
								megamenuoffsetleft = offset.left - pageoffset;
								megamenuoffsetright = offset.right - pageoffset;
								dropdown.filter('.sub-menu').css({
									'left': menuoffset
								});
								dropdown.filter('.thb_mega_menu_holder').css({
									'left': - megamenuoffsetleft,
									'right': - megamenuoffsetright
								});
								dropdown.fadeIn();
								$(this).find('>a').addClass('active');

							},
							function () {
								that.removeClass('sfHover');
								dropdown.hide();
								$(this).find('>a').removeClass('active');
							}
						);

						children.hoverIntent(
							function () {
								that.addClass('sfHover');
								$(this).find('>.sub-menu').fadeIn();
								$(this).find('>a').addClass('active');

							},
							function () {
								that.removeClass('sfHover');
								$(this).find('>.sub-menu').hide();
								$(this).find('>a').removeClass('active');
							}
						);
					});

			}
		},
		footerToggle: {
			selector: '#footer-toggle',
			init: function() {
				var base = this,
						container = $(base.selector);

                $('body').on('click', container.selector,  function() {
					container.hide();
					$('#footer').find('.columns:not(.toggle)').slideDown(400);

					return false;
				});
			}
		},
		footerStyle: {
			selector: '#footer_container',
			init: function() {
				var base = this,
						container = $(base.selector);

				base.run(container);

				win.resize(function() {
					base.run(container);
				});
			},
			run: function(container) {
				var h;
				container.imagesLoaded(function() {
					h = container.outerHeight();
					$('div[role="main"]').css('margin-bottom', h);
				});
			}
		},
		updateCart: {
			selector: '#quick_cart',
			init: function() {
				var base = this,
						container = $(base.selector);
				if (win.width() > 767) {
					container.on({
						mouseenter: function() {
							$(this).find('.cart_holder').fadeIn(400);
						},
						mouseleave: function() {
							$(this).find('.cart_holder').hide();
						}
					});
				}
				$('body').bind('added_to_cart', SITE.updateCart.update_cart_dropdown);
			},
			update_cart_dropdown: function(event) {

				if(typeof event != 'undefined'){
					var flashInterval = setInterval(function() {
						$(SITE.updateCart.selector).toggleClass('active');
					}, 500);

					setTimeout(function(){ clearInterval(flashInterval); }, 2500);
				}
			}
		},
		fullWidth: {
			selector: '.full-width-section',
			init: function() {
				var base = this,
						container = $(base.selector);

				base.resize(container);

				win.resize(function() {
					base.resize(container);
				});
			},
			resize: function(container) {
				var body = $('body'),
						outerContainer = (body.hasClass('boxed') ? $('#wrapper') : win ),
						w = outerContainer.width(),
						OutMargin = Math.ceil( ((w - Math.floor(container.parents('.post-content').width())) / 2) );


				container.each(function(){
					var that = $(this);
					if (body.hasClass('rtl')) {
						that[0].style.setProperty( 'margin-right', - OutMargin + 'px', 'important' );
					} else {
						that[0].style.setProperty( 'margin-left', - OutMargin + 'px', 'important' );
					}
					that[0].style.setProperty( 'padding-left', OutMargin + 'px', 'important' );
					that[0].style.setProperty( 'padding-right', OutMargin + 'px', 'important' );
					that[0].style.setProperty( 'visibility', 'visible');
				});
			}
		},
		fullWidthContent: {
			selector: '.full-width-content',
			init: function() {
				var base = this,
						container = $(base.selector);

				base.resize(container);
				win.resize(function() {
					base.resize(container);
				});

			},
			resize: function(container) {
				var body = $('body'),
						outerContainer = (body.hasClass('boxed') ? $('#wrapper') : win ),
						w = outerContainer.width(),
						OutMargin = Math.ceil( ((w - Math.floor(container.parents('.post').width())) / 2) );

				container.each(function(){
					if (body.hasClass('rtl')) {
						$(this).css({
						'margin-right': - OutMargin,
						'width': w
						});
					} else {
						$(this).css({
							'margin-left': - OutMargin,
							'width': w
						});
					}
				});
			}
		},
		carousel: {
			selector: '.owl',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {
					var that = $(this),
							columns = that.data('columns'),
							navigation = (that.data('navigation') === true ? true : false),
							autoplay = (that.data('autoplay') === false ? false : true),
							pagination = (that.data('pagination') === true ? true : false),
							transition = (that.data('transition') ? that.data('transition'): false);


					that.owlCarousel({
            //Basic Speeds
            slideSpeed : 1200,

            //Autoplay
            autoPlay : autoplay,
            goToFirst : true,
            stopOnHover: true,

            // Navigation
            navigation : navigation,
            navigationText : ['<i class="icon-budicon-439"></i>','<i class="icon-budicon-447"></i>'],
            pagination : pagination,

            // Responsive
            responsive: true,
            items : columns,
            itemsDesktop: false,
            itemsDesktopSmall : [980,(columns < 3 ? columns : 3)],
            itemsTablet: [768,(columns < 2 ? columns : 2)],
            itemsMobile: [479,1],
            addClassActive: true,
            transitionStyle: transition,
            autoHeight: true
					});
				});
			}
		},
		thumbnailGallery: {
			selector: '.thumbnail_gallery',
			init: function() {
				var base = this,
						container = $(base.selector);



					var that = container,
							thumbnails = $(that.data('thumbs')),
							tcount = thumbnails.data('count'),
							navigation = (that.data('navigation') === true ? true : false),
							autoplay = (that.data('autoplay') === false ? false : true),
							pagination = (that.data('pagination') === true ? true : false),
							owldata = that.data('owlCarousel');


					if (owldata) {
						owldata.destroy();
						return;
					}

					thumbnails.owlCarousel({
						items : (tcount ? tcount : 10),
						itemsDesktop      : [1199,(tcount ? tcount : 10)],
						itemsDesktopSmall     : [979,(tcount ? tcount : 10)],
						itemsTablet       : [768,(tcount ? tcount : 8)],
						itemsMobile       : [479,(tcount ? tcount - 2 : 4)],
						navigation:	false,
						pagination: false,
						responsiveRefreshRate : 100
					});

					that.owlCarousel({
						singleItem : true,
						slideSpeed : 1000,
						navigation: navigation,
						pagination: pagination,
						navigationText : ['<i class="icon-budicon-439"></i>','<i class="icon-budicon-447"></i>'],
						afterAction : syncPosition,
						responsiveRefreshRate : 200,
						afterInit : function(el){
							navHeight(el);
						},
						afterUpdate: navHeight
					});

					thumbnails.on("click", ".owl-item", function(e){
						e.preventDefault();
						var number = $(this).data("owlItem");
						that.trigger("owl.goTo",number);
					});


					function syncPosition(){
						var current = this.currentItem;
						thumbnails
						.find(".owl-item")
						.removeClass("synced")
						.eq(current)
						.addClass("synced");

						if (that.hasClass('shortcode')) {
							thumbnails.find(".owl-item").find('img').tooltip({trigger: 'manual', container: 'body'}).tooltip('hide');

							thumbnails.find(".owl-item").eq(current).find('img').tooltip('show');
						}
						if(thumbnails.data("owlCarousel") !== undefined){
							center(current);
						}
					}

					function center(number){
						var sync2visible = thumbnails.data("owlCarousel").owl.visibleItems;
						var num = number;
						var found = false;
						for(var i in sync2visible){
							if(num === sync2visible[i]){
								var found = true;
							}
						}

						if(found===false) {
							if(num>sync2visible[sync2visible.length-1]) {
								thumbnails.trigger("owl.goTo", num - sync2visible.length+2);
							} else {
							if(num - 1 === -1){
								num = 0;
							}
								thumbnails.trigger("owl.goTo", num);
							}
						} else if(num === sync2visible[sync2visible.length-1]) {
							thumbnails.trigger("owl.goTo", sync2visible[1]);
						} else if(num === sync2visible[0]) {
							thumbnails.trigger("owl.goTo", num-1);
						}

					}

					function navHeight(el){
						var div = el.find('.owl-buttons>div'),
								h = el.parents('.carousel-container').find('.thumbnails').height();

						div.css({
							'height': h,
							'line-height': (h+2)+'px'
						});
					}

			}
		},
		tooltips: {
			selector: '.hastip',
			init: function() {
				var base = this,
				container = $(base.selector);

				container.tooltip({
					'container' : 'body'
				});
			}
		},
		toggle: {
			selector: '.toggle .title',
			init: function() {
				var base = this,
				container = $(base.selector);
				container.each(function() {
					var that = $(this);
					that.on('click', function() {

						if (that.hasClass('toggled')) {
							that.removeClass("toggled").closest('.toggle').find('.inner').slideUp(200);
						} else {
							that.addClass("toggled").closest('.toggle').find('.inner').slideDown(200);
						}

					});
				});
			}
		},
		jplayer: {
			selector: '[id^=jplayer_]',
			init: function() {
				var base = this,
				container = $(base.selector);

				container.each(function() {
					var that = $(this),
							iface = that.data('interface'),
							mp3file = that.data('mp3'),
							swffile = that.data('swf');

					that.jPlayer({
						ready: function () {
							$(this).jPlayer("setMedia", {
								mp3: mp3file
							});
						},
						swfPath: swffile,
						cssSelectorAncestor: iface,
						supplied: "mp3"
					});
				});
			}
		},
		masonry: {
			selector: '.masonry:not(.posts)',
			init: function() {
				var base = this,
				container = $(base.selector);


				container.each(function() {
					var that = $(this),
							loadmore = $(that.data('loadmore')),
							page = 1;

					win.load(function() {
						that.isotope({
							itemSelector : '.item',
							transitionDuration : '1s'
						});
						that.isotope( 'on', 'layoutComplete', function() {
							SITE.carousel.init();
							SITE.jplayer.init();
							SITE.magnificImage.init();
						});

                        $('body').on('click',loadmore.selector,  function(){
							var text = loadmore.text(),
									type = loadmore.data('type'),
									loading = loadmore.data('loading'),
									list = loadmore.data('list'),
									nomore = loadmore.data('nomore'),
									initial = loadmore.data('initial'),
									categories = loadmore.data('categories'),
									count = loadmore.data('count');

							loadmore.text(loading).addClass('loading');

							$.post( themeajax.url, {

									action: 'thb_ajax',
									count : count,
									type : type,
									list : list,
									initial : initial,
									categories : categories,
									page : page++

							}, function(data){

								var d = $.parseHTML(data),
										l = ($(d).length - 1) / 2;

								if( data === '' || data === 'undefined' || data === 'No More Posts' || data === 'No $args array created') {
									data = '';
									loadmore.text(nomore).removeClass('loading');
								} else if (l < count){
									loadmore.text(nomore).removeClass('loading');
									$(d).appendTo(that).hide().imagesLoaded(function() {
										$(d).show();
										that.isotope( 'appended', $(d) );
									});
								} else{
									loadmore.text(text).removeClass('loading');
									$(d).appendTo(that).hide().imagesLoaded(function() {
										$(d).show();
										that.isotope( 'appended', $(d) );
									});
								}
								that.imagesLoaded(function() {
									that.isotope('layout');
								});

							});
							return false;
						});
					});
				});
			}
		},
		likethis: {
			selector: '.likeThis',
			init: function() {
				var base = this,
						container = $(base.selector);

                $('body').on('click', container.selector, function() {

					var that = $(this),
							id = that.data('id'),
							blogurl = $('body').data('url');

					if (that.hasClass('active')) {
						return false;
					} else {
						$.ajax({
							type: "POST",
							url: blogurl + "/index.php",
							data: "likepost=" + id,
							success: function() {
								var num = $('.likeThis[data-id='+id+']').find('.count').text();

								num++;
								$('.likeThis[data-id='+id+']').find('.count').html(num);
								that.addClass("active");
							}
						});
					}
					return false;
				});
			}
		},
		portfolio: {
			selector: '.thb-portfolio.ajax',
			init: function() {
				var base = this,
				container = $(base.selector);
				win.load(function() {
					container.isotope({
						itemSelector : '.item',
						transitionDuration : '1s'
					});
				});
				$('.filters a').click(function(){
					$('.filters a').removeClass('active');
					$(this).addClass('active');
					var selector = $(this).attr('data-filter');
					container.isotope({ filter: selector });
					return false;
				});

				$('#portfolioselect a').click(function(){
					$('#portfolioselect a').removeClass('active');
					$(this).addClass('active');
					var selector = $(this).attr('data-filter');
					$('#portfolioselect').toggleClass('open');
					$('#portfolioselect').find('ul').stop(true,true).slideToggle(600,$.bez(thb_easing), function() {
						container.isotope({ filter: selector });
					});
					return false;
				});
			}
		},
		portfolioPaginated: {
			selector: '.thbportfolio.paginated',
			init: function() {
				var container = $('#portfolioselect a');

				container.on('click', function(){
						$(this).parent().toggleClass('open');
						$(this).parent().find('ul').stop(true,true).slideToggle(600,$.bez(thb_easing));
				});
			}
		},
		blank: {
			selector: '.thb-blank #wrapper',
			init: function() {
				var base = this,
						container = $(base.selector);

				base.resize(container);

				win.resize(function() {
					base.resize(container);
				});
				win.scroll(function(){
					base.resize(container);
				});
			},
			resize: function(container) {
				var h = container.outerHeight();

				container.css('margin-top', h / -2);
			}
		},
		shareThisArticle: {
			selector: '#product_share',
			init: function() {
				var base = this,
						container = $(base.selector),
						fb = container.data('fb'),
						tw = container.data('tw'),
						pi = container.data('pi'),
						li  = container.data('li'),
						temp = '';

				if (fb) {
					temp += '<a href="#" class="boxed-icon facebook"><i class="icon-budicon-834"></i></a> ';
				}
				if (tw) {
					temp += '<a href="#" class="boxed-icon twitter"><i class="icon-budicon-841"></i></a> ';
				}
				if (pi) {
					temp += '<a href="#" class="boxed-icon pinterest"><i class="icon-budicon-817"></i></a> ';
				}
				if (li) {
					temp += '<a href="#" class="boxed-icon linkedin"><i class="icon-budicon-802"></i></a> ';
				}
				container.find('.placeholder').sharrre({
					share: {
						facebook: fb,
						twitter: tw,
						pinterest: pi,
						linkedin: li
					},
					urlCurl: $('body').data('sharrreurl'),
					template: temp,
					enableHover: false,
					enableTracking: false,
					render: function(api){
						$(api.element).on('click', '.twitter', function() {
							api.openPopup('twitter');
						});
						$(api.element).on('click', '.facebook', function() {
							api.openPopup('facebook');
						});
						$(api.element).on('click', '.pinterest', function() {
							api.openPopup('pinterest');
						});
						$(api.element).on('click', '.linkedin', function() {
							api.openPopup('linkedin');
						});
					}
				});
			}
		},
		parallax: {
			selector: '.parallax_bg',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {

					var that = $(this),
							speed = that.data('parallax-speed');

					function backgroundAnimate() {
						var top = (win.width() > 767) ? win.height() - (that.offset().top - win.scrollTop()) : 0,
								yPos = Math.floor(-(top / speed));

						if (that.is(':in-viewport') && win.width() > 767) {
							that[0].style.setProperty( 'background-position', '50% '+ yPos + 'px', 'important' );
						}
						requestAnimFrame(backgroundAnimate);
					}
					requestAnimFrame(backgroundAnimate);
				});
			}
		},
		wpml: {
			selector: '#thb_language_selector',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.on('change', function () {
				var url = $(this).val(); // get selected value
					if (url) { // require a URL
						window.location = url; // redirect
					}
					return false;
				});
			}
		},
		scrollFade: {
			selector: '.scroll_fade',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {

					var that = $(this);


					function elementFade() {
						var top = (win.width() > 767) ? Math.floor(window.pageYOffset) : 0;

						if (that.is(':in-viewport')) {
							that.find('>.row').css({
								'-webkit-transform': 'translateY(' +  top / 4 + 'px)',
								'-moz-transform': 'translateY(' +  top / 4 + 'px)',
								'transform': 'translateY(' +  top / 4 + 'px)',
								'opacity' : 1 - (top/400)
							});
						}
						requestAnimFrame(elementFade);
					}

					requestAnimFrame(elementFade);
				});
			}
		},
		animation: {
			selector: '.animation:not(.timertitle)',
			init: function() {
				var base = this,
						container = $(base.selector);

				base.control(container);

				win.scroll(function(){
					base.control(container);
				});
			},
			control: function(element) {
				var t = -1;
				element.filter(':not(.animate):in-viewport').each(function () {
					var that = $(this);
							t++;

					setTimeout(function () {
						that.addClass("animate");

						if (that.hasClass('thb_counter')) {
							var f = that.find('.timer'),
									c = (f.data('countto') ? f.data('countto') : 100),
									s = (f.data('speed') ? f.data('speed') : 1500),
									title = that.find('.timertitle');
							f.countTo({
								from: 0,
								to: c,
								speed: s,
								refreshInterval: 50,
								onComplete: function() {
									title.addClass('animate');
								}
							});
						}
					}, 200 * t);

				});
			}
		},
		bargraph: {
			selector: '.progress_bar',
			init: function() {
				var base = this,
						container = $(base.selector);
				container.filter(':not(.appeared):in-viewport').each(function () {
					var that = $(this),
							i = that.find('.bar'),
							tt = that.find('.tooltip.top'),
							tti = tt.find('.tooltip-inner'),
							c = that.find('.progress'),
							p = i.data('value');

					c.animate({
							width: p+"%"
					}, {
						duration: 1500,
						step: function(n) {
							tti.text(Math.floor(n) + ' %');
						},
						start: function() {
							tt.fadeIn(1500);
						}
					});

					that.addClass('appeared');
				});
			}
		},
		counter: {
			selector: '.thb_counter',
			init: function() {
				var base = this,
						container = $(base.selector);


				win.scroll(function(){
					SITE.animation.control(container);
				});
			}
		},
		jobApplication: {
			selector: '.job_application',
			init: function() {
				var base = this,
						container = $(base.selector);


				container.each(function() {
					var that = $(this),
							title = that.find('.title'),
							btn = that.find('.job_form'),
							close = that.find('.close'),
							content = that.find('.content'),
							form = that.find('.contact-form');

					title.on('click',function() {
						if (container.length < 1) {
							that.toggleClass('active');
							if ( form.is(':visible') || content.is(':visible') ) {
								that.find('.content,.contact-form').slideUp('200');
							} else {
								that.find('.content,.contact-form').slideUp('200');
								content.slideDown('400');
							}
						} else if (form.length > 0 && form.is(':hidden') && content.is(':hidden') ) {
							container.removeClass('active').find('.content,.contact-form').slideUp('200');
							that.addClass('active');
							content.slideDown('400');
						} else if (form.length < 1 && content.is(':hidden') ) {
							container.removeClass('active').find('.content,.contact-form').slideUp('200');
							that.addClass('active');
							content.slideDown('400');
						} else {
							content.add(form).slideUp('400', function() {
								that.removeClass('active');
							});
						}
						return false;
					});
					close.on('click',function() {
						form.slideToggle('400', function() {
							content.slideToggle('400');
						});
						return false;
					});
					btn.on('click',function() {
						content.slideToggle('400', function() {
							form.slideToggle('400');
						});
						return false;
					});
				});
			}
		},
		shop: {
			selector: '.products .product',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {
					var that = $(this);

					that
					.find('.add_to_cart_button').on('click', function() {
						if ($(this).data('added-text') !== '') {
							$(this).text($(this).data('added-text'));
						}
					}).end()
					.find('.quick-view').on('click', function() {
						that.addClass('loading');
						var that2 = $(this),
								pid = that2.data('id');
						$.post(themeajax.url, {
							action: 'quickview',
							id: pid,
						}, function(resp) {
							$.magnificPopup.open({
							mainClass: 'mfp-move-horizontal product-popup',
							items: {
								src: resp,
								type: 'inline'
							},
							overflowY: 'scroll',
							closeBtnInside: false,
							closeMarkup: '<button title="%title%" class="mfp-close"></button>',
							removalDelay: 250,
							callbacks: {
								open: function() {
									SITE.carousel.init();
									$(this.content[0]).find('form').wc_variation_form();
								},
								change: function() {
									SITE.carousel.init();
									$(this.content[0]).find('form').wc_variation_form();
									$(this.contentContainer).removeClass('popup-loading');
								}
							}
						});
							that.removeClass('loading');

                            $('body').on('click', '.mfp-content .product_nav a', function() {
								$('.mfp-content').addClass('popup-loading');

								$.post(themeajax.url, {
									action: 'quickview',
									id: $(this).data('id'),
								}, function(resp) {
									$.magnificPopup.open({
										items: {
											src: resp,
											type: 'inline'
										},
										closeBtnInside: false
									});
								});
								return false;
							}); // product_nav click end
						}); // post end

						return false;
					}); // quick-view click end

				}); // each

			}
		},
		variations: {
			selector: '.variations_form input[name=variation_id]',
			init: function() {
				var base = this,
						container = $(base.selector);
				container.on('change', function() {
					var that = $(this),
							phtml;
					setTimeout(function(){
						phtml = that.parents('.single_variation_wrap').find('.single_variation span.price').html();
						$('.price.single_variation').html(phtml);
					}, 100);

					var val = $('select[name=attribute_pa_color] option:selected').val(),
							i = $('#product-nav').find('[data-variation-color="'+val+'"]').parents('.owl-item').index(),
							owl = $('#product-images').data('owlCarousel');
					owl.goTo(i);
				});
			}
		},
		reviews: {
			selector: '#comment_popup',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.on( 'click', 'p.stars a', function(){
					var that = $(this);

					setTimeout(function(){ that.prevAll().addClass('active'); }, 10);
				});
			}
		},
		checkout: {
			selector: '.woocommerce-checkout',
			init: function() {

				$('#shippingsteps a').on('click', function() {
					var that = $(this),
							target = (that.data('target') ? $('#'+that.data('target')) : false);

					if (target) {
						$('#shippingsteps li').removeClass('active');
						that.parents('li').addClass('active');
						$('.section').hide();
						target.show();
					}
					return false;
				});

				$('#createaccount', '#checkout_login').on('click', function() {
					$('#checkout_register', '#checkout_login').slideToggle();
					return false;
				});
				$('#ship-to-different-address-checkbox').on('change', function() {
					$('.shipping_address').slideToggle('slow', function() {
						if($('.shipping_address').is(':hidden')) {
							$('form.checkout .shipping_address').find('p.form-row').removeClass('woocommerce-invalid-required-field');
						}
					});
					return false;
				});
			}
		},
		myaccount: {
			selector: '.woocommerce-account',
			init: function() {
				$('#my-account-nav a').on('click', function() {
					var that = $(this),
							tabs = $('.tab-pane'),
							target = $(that.attr('href'));

					$('#my-account-nav li').removeClass('active');
					that.parents('li').addClass('active');
					tabs.hide();
					target.fadeIn();

					return false;
				});
				$('#changepassword_btn').on('click', function() {
					$('#changeit').trigger('click');

					return false;
				});
			}
		},
		magnificImage: {
			selector: '[rel="magnific"], .wp-caption a',
			init: function() {
				var base = this,
						container = $(base.selector),
						stype;

				container.each(function() {
					if ($(this).hasClass('video')) {
						stype = 'iframe';
					} else {
						stype = 'image';
					}
					$(this).magnificPopup({
						type: stype,
						closeOnContentClick: true,
						fixedContentPos: true,
						closeBtnInside: false,
						closeMarkup: '<button title="%title%" class="mfp-close"></button>',
						mainClass: 'mfp-move-horizontal',
						removalDelay: 250,
						overflowY: 'scroll',
						image: {
							verticalFit: true
						}
					});
				});

			}
		},
		magnificInline: {
			selector: '[rel="inline"]',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {
					var eclass = ($(this).data('class') ? $(this).data('class') : '');

					$(this).magnificPopup({
						type:'inline',
						midClick: true,
						mainClass: 'mfp-move-horizontal ' + eclass,
						removalDelay: 250,
						closeBtnInside: false,
						overflowY: 'scroll',
						closeMarkup: '<button title="%title%" class="mfp-close"></button>'
					});
				});

			}
		},
		magnificGallery: {
			selector: '[rel="gallery"]',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {
					$(this).magnificPopup({
						delegate: 'a',
						type: 'image',
						closeOnContentClick: true,
						fixedContentPos: true,
						mainClass: 'mfp-move-horizontal',
						removalDelay: 250,
						closeBtnInside: false,
						overflowY: 'scroll',
						closeMarkup: '<button title="%title%" class="mfp-close"></button>',
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0,1] // Will preload 0 - before current, and 1 after the current image
						},
						image: {
							verticalFit: true,
							titleSrc: function(item) {
								return item.el.attr('title');
							}
						}
					});
				});

			}
		},
		dial: {
			selector: '.knob',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.filter(':not(.appeared):in-viewport').each(function() {
					var p = $(this),
							that = p.find('.dial'),
							i = p.find('.icon'),
							ao = Math.round(Math.random() * 360),
							w = container.data('width'),
							v = that.data('value'),
							fg = that.data('fg'),
							bg = that.data('bg');
					that.addClass('visible').knob({
						readOnly: true,
						bgColor: bg,
						fgColor: fg,
						thickness: 0.1,
						angleOffset: ao,
						width: w
					});
					i.css({
						'marginTop' : -1 * Math.floor(p.find('canvas').height()/4)
					});
					$({value: 0}).animate({value: v}, {
						duration: 2000,
						easing: $.bez(thb_easing),
						step: function() {
							that.val(Math.ceil(this.value)).trigger('change');
						}
					});

					p.addClass('appeared');
				});
			}
		},
		shopSidebar: {
			selector: '.woo.sidebar .widget.woocommerce',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {
					var that = $(this),
							t = that.find('h6');

					t.append($('<span/>')).on('click', function() {
						t.toggleClass('active');
						t.next().animate({
							height: "toggle",
							opacity: "toggle"
						}, 300);
					});
				});
			}
		},
		parsley: {
			selector: '.comment-form, .wpcf7-form',
			init: function() {
				var base = this,
						container = $(base.selector);

				if ($.fn.parsley) {
					container.parsley();
				}
			}
		},
		commentToggle: {
			selector: '#commenttoggle',
			init: function() {
				var base = this,
						container = $(base.selector),
						respond = $('#respond'),
						parent = respond.find('#comment_parent');

                $('body').on('click', container.selector,  function() {
					respond.slideToggle();
					return false;
				});
			}
		},
		large_ciclee: {
			selector: '.thb_largecircleicons',
			init: function() {
				var base = this,
						container = $(base.selector);

				container.each(function() {
					var that = $(this),
							hover_background_color = that.data('hover-background-color'),
							initial_background_color = that.find('span').css('background-color'),
							hover_border_color = that.data('hover-border-color'),
							initial_border_color = that.find('span').css('border-top-color'),
							hover_color = that.data('hover-color'),
							initial_color = that.find('span i').css('color');

							that.find('span').hover(
							function() {
								that.find('i').css('color', hover_color);
							},
							function() {
								that.find('i').css('color', initial_color);
							});

							that.find('span').hover(
							function() {
								that.css('background-color', hover_background_color);
								$(this).css('border-color', hover_border_color);
							},
							function() {
								that.css('background-color', initial_background_color);
								$(this).css('border-color', initial_border_color);
							});
				});
			}
		},
		page_scroll: {
			selector: '.page_scroll',
			init: function() {
				var base = this,
						container = $(base.selector),
						nav = $('.header nav');

				nav.onePageNav({
				    currentClass: 'current-menu-item',
				    changeHash: false,
				    topOffset: 70
				});
			}
		},
		contact: {
			selector: '.contact_map',
			init: function() {
				var base = this,
						container = $(base.selector);


				var styles = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}];

				container.each(function() {
					var that = $(this),
							mapzoom = that.data('map-zoom'),
							maplat = that.data('map-center-lat'),
							maplong = that.data('map-center-long'),
							pinlatlong = that.data('latlong'),
							pinimage = that.data('pin-image');

					var centerlatLng = new google.maps.LatLng(maplat,maplong);

					var mapOptions = {
							center: centerlatLng,
							styles: styles,
							zoom: mapzoom,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false,
							panControl: true,
							zoomControl: 1,
							mapTypeControl: false,
							scaleControl: false,
							streetViewControl: false
						};

					var map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);

					google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
						if(pinimage.length > 0) {
							var pinimageLoad = new Image();
							pinimageLoad.src = pinimage;

							$(pinimageLoad).load(function(){
								base.setMarkers(map, pinlatlong, pinimage);
							});
						}
						else {
							base.setMarkers(map, pinlatlong, pinimage);
						}
					});
				});
			},
			setMarkers: function(map, pinlatlong, pinimage) {
				var infoWindows = [];


				function showPin (i) {
					var latlong_array = pinlatlong[i].lat_long.split(','),
							marker = new google.maps.Marker({
							position: new google.maps.LatLng(latlong_array[0],latlong_array[1]),
							map: map,
							animation: google.maps.Animation.DROP,
							icon: pinimage,
							optimized: false
					});

					// info windows
					var infowindow = new google.maps.InfoWindow({
						content: pinlatlong[i].title,
						maxWidth: 300
					});

					infoWindows.push(infowindow);

					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infoWindows[i].open(map, this);
						};
					})(marker, i));
				}

				for (var i = 0; i + 1 <= pinlatlong.length; i++) {
					setTimeout(showPin, i * 250, i);
				}
			}
		},
		locations: {
			selector: '.location-container',
			init: function() {
				var base = this,
						container = $(base.selector);


				var styles = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}];

				container.each(function() {
					var that = $(this),
							themap = that.find('.location_map'),
							themapid = themap.attr('id'),
							locations = that.find('.location'),
							mapzoom = themap.data('map-zoom'),
							maplat = themap.data('map-center-lat'),
							maplong = themap.data('map-center-long'),
							pinimage = themap.data('pin-image');

					var centerlatLng = new google.maps.LatLng(maplat,maplong);

					var mapOptions = {
							center: centerlatLng,
							styles: styles,
							zoom: mapzoom,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false,
							panControl: true,
							zoomControl: 1,
							mapTypeControl: false,
							scaleControl: false,
							streetViewControl: false
						};
					if (locations) {
						var pinlatlong = [];


						locations.each(function() {
								var that = $(this),
										lat_long = that.data('lat_long'),
										title = that.data('title');

								var array = { "lat_long" : lat_long, "title" : title };

								pinlatlong.push(array);


						}).on('click', function() {
							var that = $(this),
									lat_long = that.data('lat_long'),
									latlong_array = lat_long.split(','),
									pincenterlatLng = new google.maps.LatLng(latlong_array[0],latlong_array[1]),
									offset = that.offset(),
									w = that.outerWidth(),
									window_width = $(window).width() / 2;
							locations.removeClass('active');
							that.addClass('active');
							map.panTo(pincenterlatLng);
							map.panBy(window_width- (offset.left + w), 0);
							return false;
						}); //.filter(':first-of-type').trigger('click');
					}

					var map = new google.maps.Map(document.getElementById(themapid), mapOptions);

					google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
						if(pinimage.length > 0) {
							var pinimageLoad = new Image();
							pinimageLoad.src = pinimage;

							$(pinimageLoad).load(function(){
								base.setMarkers(map, pinlatlong, pinimage);
							});
						}
						else {
							base.setMarkers(map, pinlatlong, pinimage);
						}

						if (locations) {
							locations.filter(':first').trigger('click');
						}
					});
				});
			},
			setMarkers: function(map, pinlatlong, pinimage) {

				for (var i = 0; i + 1 <= pinlatlong.length; i++) {
					(function(i) {

						setTimeout(function() {
							var latlong_array = pinlatlong[i].lat_long.split(','),
									marker = new google.maps.Marker({
									position: new google.maps.LatLng(latlong_array[0],latlong_array[1]),
									map: map,
									animation: google.maps.Animation.DROP,
									icon: pinimage,
									optimized: false
							});

						}, i * 250); // end setTimeout
					}(i)); // end auto function
				} // end for
			}
		},
		equalHeights: {
			selector: '[data-equal]',
			init: function() {
				var base = this,
						container = $(base.selector);
				container.each(function(){
					var that = $(this),
							children = that.data("equal");

					that.imagesLoaded(function() {
						that.find(children).matchHeight(true);
					});

				});
			}
		},
		favicon: {
			selector: 'body',
			init: function() {
				var base = this,
						container = $(base.selector),
						count = container.data('cart-count');
//					favicon = new Favico({
//							bgColor : '#e25842',
//							textColor : '#fff'
//					});
//				favicon.badge(count);
			}
		},
		styleSwitcher: {
			selector: '#style-switcher',
			init: function() {
				var base = this,
						container = $(base.selector),
						toggle = container.find('.style-toggle'),
						onoffswitch = container.find('.switch');

						toggle.on('click', function() {
							container.add($(this)).toggleClass('active');
							return false;
						});

						onoffswitch.each(function() {
							var that = $(this);

							that.find('a').on('click', function() {
								var dataclass = $(this).data('class');

								that.find('a').removeClass('active');
								$(this).addClass('active');

								if ($(this).parents('ul').data('name') == 'boxed') {
									$(document.body).removeClass('boxed');
									$(document.body).addClass(dataclass);
								}
								if ($(this).parents('ul').data('name') == 'header_grid') {
									$('.header .row, #subheader .row').removeClass('notgrid');
									$('.header .row, #subheader .row').addClass(dataclass);
								}
								return false;
							});
						});

				var style = $('<style type="text/css" id="theme_color" />').appendTo('head');
				container.find('.first').minicolors({
					defaultValue: $('.first').data('default'),
					change: function(hex) {
						style.html('.headersearch span .searchform fieldset input:focus,#nav .dropdown ul li a:hover,#nav .dropdown ul li.current-menu-item>a,#sitewide_cta,.mfp-move-horizontal .mfp-arrow,.custom_check:checked+.custom_label:before,.post .post-title.portfolio-title,.carousel-container .owl-controls .owl-pagination .owl-page.active,.review-popup input[type=text]:focus,.review-popup input[type=password]:focus,.review-popup input[type=date]:focus,.review-popup input[type=datetime]:focus,.review-popup input[type=email]:focus,.review-popup input[type=number]:focus,.review-popup input[type=search]:focus,.review-popup input[type=tel]:focus,.review-popup input[type=time]:focus,.review-popup input[type=url]:focus,.review-popup textarea:focus,a.jp-play,a.jp-pause,.jp-play-bar,.jp-volume-bar-value,.mobile-menu li a.active,#comments ol.commentlist .comment-reply-link,#comments_popup_link:after,.badge.onsale,.product-information .product_nav div,.cart-collaterals .right-side,.btn,.button,input[type=submit],.comment-reply-link,.btn.black:hover,.button.black:hover,input[type=submit].black:hover,.comment-reply-link.black:hover,.btn.white.active,.button.white.active,input[type=submit].white.active,.comment-reply-link.white.active,.btn.white.active:hover,.button.white.active:hover,input[type=submit].white.active:hover,.comment-reply-link.white.active:hover,ul.accordion.style2>li.active>div.title:after,.toggle.style2 .title.wpb_toggle_title_active:after,.post .post-content .iconbox.top.type1:hover>span,.post .post-content .iconbox.top.type2:hover>span,.post .post-content .iconbox.left.type2:hover>span,.post .post-content .iconbox.right.type2:hover>span,.thumbnail_container .thumbnail_gallery .owl-controls .owl-buttons div:hover,.post .post-content .pricing_column.featured,.progress_bar .bar.blue span,.job_application.active .title,.fliplink .flipbox .flip.back,.masonry_btn:after,.location-container .location.active,.btn:hover,.button:hover,input[type=submit]:hover,.comment-reply-link:hover,.dropcap.accent,.highlight.blue,#nav ul.sub-menu li a:hover,#nav ul.sub-menu li.current-menu-item > a,[class^="tag-link"]:hover{ background:'+hex+'; } #nav .dropdown ul li a:hover,#nav .dropdown ul li.current-menu-item>a,.custom_check+.custom_label:hover:before,.custom_check:checked+.custom_label:before,.carousel-container .owl-controls .owl-pagination .owl-page:hover,.carousel-container .owl-controls .owl-pagination .owl-page.active,input[type=text]:focus,input[type=password]:focus,input[type=date]:focus,input[type=datetime]:focus,input[type=email]:focus,input[type=number]:focus,input[type=search]:focus,input[type=tel]:focus,input[type=time]:focus,input[type=url]:focus,textarea:focus,.review-popup input[type=text]:focus,.review-popup input[type=password]:focus,.review-popup input[type=date]:focus,.review-popup input[type=datetime]:focus,.review-popup input[type=email]:focus,.review-popup input[type=number]:focus,.review-popup input[type=search]:focus,.review-popup input[type=tel]:focus,.review-popup input[type=time]:focus,.review-popup input[type=url]:focus,.review-popup textarea:focus,.mobile-menu li a.active,.filters li a.active,.woocommerce-checkout .form-row .chosen-container .chosen-drop,.btn.black:hover,.button.black:hover,input[type=submit].black:hover,.comment-reply-link.black:hover,.btn.black.outline:hover,.button.black.outline:hover,input[type=submit].black.outline:hover,.comment-reply-link.black.outline:hover,.btn.white.active,.button.white.active,input[type=submit].white.active,.comment-reply-link.white.active,.btn.white.active:hover,.button.white.active:hover,input[type=submit].white.active:hover,.comment-reply-link.white.active:hover,ul.accordion.style2>li.active>div.title:after,.toggle.style2 .title.wpb_toggle_title_active:after,.post .post-content .iconbox.top.type2:hover>span,.post .post-content .iconbox.left.type2:hover>span,.post .post-content .iconbox.right.type2:hover>span,.btn,.button,input[type=submit],.comment-reply-link,.btn:hover,.button:hover,input[type=submit]:hover,.comment-reply-link:hover,#nav ul.sub-menu li a:hover,.product-popup .mfp-content,#nav ul.sub-menu li.current-menu-item > a,.location-container .location.active:after,[class^="tag-link"]:hover { border-color: '+hex+'; } a,.headersearch span:hover,#nav .sf-menu>li.current-menu-item>a,#nav .sf-menu>li>a:hover,#quick_cart,.post .post-content ol li:before,.fresco .overlay .buttons a:hover,#footer .widget h6,.widget ul.menu .current-menu-item>a,.widget.widget_products ul li span,.widget.woocommerce.widget_layered_nav ul li .count,a.jp-mute,a.jp-unmute,.notfound p a,.filters li a.active,#comments_popup_link,.price ins,.price>.amount,.mfp-content .product_nav a,.cart-collaterals .right-side .button.white:hover,.lost_password,.payment_methods li .custom_check:checked+.custom_label,.btn.outline,.button.outline,input[type=submit].outline,.comment-reply-link.outline,.btn.black.outline:hover,.button.black.outline:hover,input[type=submit].black.outline:hover,.comment-reply-link.black.outline:hover,ul.accordion>li.active div.title,ul.accordion>li.active div.title:hover,ul.accordion.style1>li.active>div.title:after,dl.tabs dd.active a,dl.tabs li.active a,ul.tabs dd.active a,ul.tabs li.active a,dl.tabs dd.active a:hover,dl.tabs li.active a:hover,ul.tabs dd.active a:hover,ul.tabs li.active a:hover,.toggle.style1 .title.wpb_toggle_title_active,.toggle.style1 .title.wpb_toggle_title_active:after,.toggle.style1 .title.wpb_toggle_title_active:hover,.toggle.style2 .title.wpb_toggle_title_active,.toggle.style2 .title.wpb_toggle_title_active:hover,.post .post-content .iconbox.top.type2>span,.post .post-content .iconbox.top.type3>span,.post .post-content .iconbox.left.type1>span,.post .post-content .iconbox.left.type2>span,.post .post-content .iconbox.right.type1>span,.post .post-content .iconbox.right.type2>span,.thb_counter span,.thb_counter figure,.progress_bar.dark .tooltip.top.in .tooltip-inner,.progress_bar.dark .tooltip.top.in,.job_application .title span,.bw_container.row .bw.columns:hover .content>.title,.post .post-title a:hover { color: '+hex+'; } ::-webkit-selection{ background-color: '+hex+'; } ::-moz-selection{ background-color: '+hex+'; } ::selection{ background-color: '+hex+'; } ');
					}
				});
			}
		}
	};

	// on Resize & Scroll
	win.resize(function() {
		SITE.navDropdown.init();
	});
	win.scroll(function(){
		SITE.bargraph.init();
		SITE.dial.init();
	});

	$doc.ready(function() {
		SITE.init();
	});

})(jQuery, this);