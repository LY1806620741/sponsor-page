jQuery(document).ready(function() {
	var QRBox	=	$('#QRBox');
	var MainBox	=	$('#MainBox');
	var BTCQR	=	'images/BTCQR.jpg';	// 二维码路径
	var AliPayQR	=	'images/alipayQR.jpg';
	var WeChanQR	=	'images/wechatQR.jpg';

	

	function showQR(QR) {
		if (QR) {
			MainBox.css('background-image','url('+QR+')');
		}
		$('#DonateText,#donateBox,#github').addClass('blur');
		QRBox.fadeIn(300,function(argument) {
			MainBox.addClass('showQR');
		});
	}

	$('#donateBox>li').click(function(event) {
		var thisID	=	$(this).attr('id');
		if (thisID === 'BTC') {
			showQR(BTCQR);
			new Clipboard('#BTCBn');
		} else if (thisID === 'AliPay') {
			showQR(AliPayQR);
		} else if (thisID === 'WeChat') {
			showQR(WeChanQR);
		}
	});

	MainBox.click(function(event) {
		MainBox.removeClass('showQR').addClass('hideQR');
		setTimeout (function(a) {
			QRBox.fadeOut(300,function(argument) {
				MainBox.removeClass('hideQR');
			});
			$('#DonateText,#donateBox,#github').removeClass('blur');
		},600);

	});
});
