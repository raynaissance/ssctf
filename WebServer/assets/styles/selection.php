<?php 
	$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
	require_once( $parse_uri[0] . 'wp-load.php' );
	require_once('../../inc/ot-functions.php');
	$id = (isset($_GET['id']) ? htmlspecialchars($_GET['id']) : '');
	
	Header("Content-type: text/css");
	error_reporting(0);
?>
<?php 
echo thb_google_webfont();
?>
/* Options set in the admin page */
body { 
	<?php thb_typeecho(ot_get_option('body_type')); ?>
	color: <?php echo ot_get_option('text_color'); ?>;
}
.header.style1 {
	<?php thb_bgecho(ot_get_option('header_style1_bg')); ?>
}
.header.style2 {
	<?php thb_bgecho(ot_get_option('header_style2_bg')); ?>
}
#pagetitle.style1,
#pagetitle.style2 {
	<?php $pagepadding = get_post_meta($id, 'pagetitle_padding', true);
				$optionpadding = ot_get_option('pagetitle_padding');
				$pagetitle_padding = ($pagepadding  ? $pagepadding[0].$pagepadding[1] : $optionpadding[0].$optionpadding[1]); ?>
	
	<?php if ($pagetitle_padding) { ?>
	padding: <?php echo $pagetitle_padding; ?> 0;
	<?php } ?>
	
	<?php $pagetitle_background = ( get_post_meta($id, 'pagetitle_background', true) ? get_post_meta($id, 'pagetitle_background', true) : ot_get_option('pagetitle_background') ); ?>
	
	<?php if ($pagetitle_background) { ?>
		<?php thb_bgecho($pagetitle_background); ?>
	<?php } ?>
}
#subheader {
	<?php thb_bgecho(ot_get_option('subheader_bg')); ?>
}
#footer {
	<?php thb_bgecho(ot_get_option('footer_bg')); ?>
}
#subfooter {
	<?php thb_bgecho(ot_get_option('subfooter_bg')); ?>
}
<?php if(ot_get_option('title_type')) { ?>
h1,h2,h3,h4,h5,h6 {
	<?php thb_typeecho(ot_get_option('title_type')); ?>	
}
<?php } ?>

/* Accent Color */
<?php if (ot_get_option('accent_color')) { ?>
a,.headersearch span:hover,#nav .sf-menu>li.current-menu-item>a,#nav .sf-menu>li>a:hover,#quick_cart,.post .post-content ol li:before,.fresco .overlay .buttons a:hover,#footer .widget h6,.widget ul.menu .current-menu-item>a,.widget.widget_products ul li span,.widget.woocommerce.widget_layered_nav ul li .count,a.jp-mute,a.jp-unmute,.notfound p a,.filters li a.active,#comments_popup_link,.price ins,.price>.amount,.mfp-content .product_nav a,.cart-collaterals .right-side .button.white:hover,.lost_password,.payment_methods li .custom_check:checked+.custom_label,.btn.outline,.button.outline,input[type=submit].outline,.comment-reply-link.outline,.btn.black.outline:hover,.button.black.outline:hover,input[type=submit].black.outline:hover,.comment-reply-link.black.outline:hover,ul.accordion>li.active div.title,ul.accordion>li.active div.title:hover,ul.accordion.style1>li.active>div.title:after,dl.tabs dd.active a,dl.tabs li.active a,ul.tabs dd.active a,ul.tabs li.active a,dl.tabs dd.active a:hover,dl.tabs li.active a:hover,ul.tabs dd.active a:hover,ul.tabs li.active a:hover,.toggle.style1 .title.wpb_toggle_title_active,.toggle.style1 .title.wpb_toggle_title_active:after,.toggle.style1 .title.wpb_toggle_title_active:hover,.toggle.style2 .title.wpb_toggle_title_active,.toggle.style2 .title.wpb_toggle_title_active:hover,.post .post-content .iconbox.top.type2>span,.post .post-content .iconbox.top.type3>span,.post .post-content .iconbox.left.type1>span,.post .post-content .iconbox.left.type2>span,.post .post-content .iconbox.right.type1>span,.post .post-content .iconbox.right.type2>span,.thb_counter span,.thb_counter figure,.progress_bar.dark .tooltip.top.in .tooltip-inner,.progress_bar.dark .tooltip.top.in,.job_application .title span,.bw_container.row .bw.columns:hover .content>.title,.post .post-title a:hover {
  color: <?php echo ot_get_option('accent_color'); ?>;
}

#nav .dropdown ul li a:hover,#nav .dropdown ul li.current-menu-item>a,.custom_check+.custom_label:hover:before,.custom_check:checked+.custom_label:before,.carousel-container .owl-controls .owl-pagination .owl-page:hover,.carousel-container .owl-controls .owl-pagination .owl-page.active,input[type=text]:focus,input[type=password]:focus,input[type=date]:focus,input[type=datetime]:focus,input[type=email]:focus,input[type=number]:focus,input[type=search]:focus,input[type=tel]:focus,input[type=time]:focus,input[type=url]:focus,textarea:focus,.review-popup input[type=text]:focus,.review-popup input[type=password]:focus,.review-popup input[type=date]:focus,.review-popup input[type=datetime]:focus,.review-popup input[type=email]:focus,.review-popup input[type=number]:focus,.review-popup input[type=search]:focus,.review-popup input[type=tel]:focus,.review-popup input[type=time]:focus,.review-popup input[type=url]:focus,.review-popup textarea:focus,.mobile-menu li a.active,.filters li a.active,.woocommerce-checkout .form-row .chosen-container .chosen-drop,.btn.black:hover,.button.black:hover,input[type=submit].black:hover,.comment-reply-link.black:hover,.btn.black.outline:hover,.button.black.outline:hover,input[type=submit].black.outline:hover,.comment-reply-link.black.outline:hover,.btn.white.active,.button.white.active,input[type=submit].white.active,.comment-reply-link.white.active,.btn.white.active:hover,.button.white.active:hover,input[type=submit].white.active:hover,.comment-reply-link.white.active:hover,ul.accordion.style2>li.active>div.title:after,.toggle.style2 .title.wpb_toggle_title_active:after,.post .post-content .iconbox.top.type2:hover>span,.post .post-content .iconbox.left.type2:hover>span,.post .post-content .iconbox.right.type2:hover>span,.btn,.button,input[type=submit],.comment-reply-link,.btn:hover,.button:hover,input[type=submit]:hover,.comment-reply-link:hover, #nav ul.sub-menu li a:hover,.product-popup .mfp-content, #nav ul.sub-menu li.current-menu-item > a,.location-container .location.active:after, [class^="tag-link"]:hover {
  border-color: <?php echo ot_get_option('accent_color'); ?>;
}

.headersearch span .searchform fieldset input:focus,#nav .dropdown ul li a:hover,#nav .dropdown ul li.current-menu-item>a,#sitewide_cta,.mfp-move-horizontal .mfp-arrow,.custom_check:checked+.custom_label:before,.post .post-title.portfolio-title,.carousel-container .owl-controls .owl-pagination .owl-page.active,.review-popup input[type=text]:focus,.review-popup input[type=password]:focus,.review-popup input[type=date]:focus,.review-popup input[type=datetime]:focus,.review-popup input[type=email]:focus,.review-popup input[type=number]:focus,.review-popup input[type=search]:focus,.review-popup input[type=tel]:focus,.review-popup input[type=time]:focus,.review-popup input[type=url]:focus,.review-popup textarea:focus,a.jp-play,a.jp-pause,.jp-play-bar,.jp-volume-bar-value,.mobile-menu li a.active,#comments ol.commentlist .comment-reply-link,#comments_popup_link:after,.badge.onsale,.product-information .product_nav div,.cart-collaterals .right-side,.btn,.button,input[type=submit],.comment-reply-link,.btn.black:hover,.button.black:hover,input[type=submit].black:hover,.comment-reply-link.black:hover,.btn.white.active,.button.white.active,input[type=submit].white.active,.comment-reply-link.white.active,.btn.white.active:hover,.button.white.active:hover,input[type=submit].white.active:hover,.comment-reply-link.white.active:hover,ul.accordion.style2>li.active>div.title:after,.toggle.style2 .title.wpb_toggle_title_active:after,.post .post-content .iconbox.top.type1:hover>span,.post .post-content .iconbox.top.type2:hover>span,.post .post-content .iconbox.left.type2:hover>span,.post .post-content .iconbox.right.type2:hover>span,.thumbnail_container .thumbnail_gallery .owl-controls .owl-buttons div:hover,.post .post-content .pricing_column.featured,.progress_bar .bar.blue span,.job_application.active .title,.fliplink .flipbox .flip.back,.masonry_btn:after,.location-container .location.active,.btn:hover,.button:hover,input[type=submit]:hover,.comment-reply-link:hover,.dropcap.accent,.highlight.blue, #nav ul.sub-menu li a:hover,#nav ul.sub-menu li.current-menu-item > a,[class^="tag-link"]:hover {
	background: <?php echo ot_get_option('accent_color'); ?>;	
}
<?php } ?>
<?php if (ot_get_option('overlay_color')) { ?>
.fresco .overlay {
	<?php $rgb = thb_hex2rgb(ot_get_option('overlay_color')); ?>
	<?php if(ot_get_option('overlay_opacity')) { 
		echo "background: rgba(".$rgb.", ".ot_get_option('overlay_opacity').");";
		} else { 
		echo "background: rgb(".$rgb.");";
		}?>
}
<?php } ?>
/* Portfolio Page */
.portfolio-header {
	<?php 
		$header_bg = get_post_meta($id, 'portfolio_header_background', true);
		if (!empty($header_bg)) {
			
			echo 'background-image:url("'.$header_bg["background-image"].'");';

		} else {
		
			thb_bgecho($header_bg);
		} 
	?>
}
/* Extra CSS */
<?php 
echo ot_get_option('extra_css');
?>