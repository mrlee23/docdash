$(document).ready(function (){
	function basename (url) {
		var fileName = url.substring(url.lastIndexOf('/') + 1);
		var dot = fileName.indexOf('.');
		return dot == -1 ? fileName : fileName.substring(0, dot);
	};
	function navScroll () {
		var navAnimated = false;
		var navFinished = true;
		$('nav > ul > li > a').each(function (key, value) {
			if (!navAnimated) {
				if (hrefBasename == basename(value.href)) {
					var top = $(this).offset().top - $('nav').offset().top - 70 + $('nav').scrollTop();

					var obj = $(this);
					$('nav').animate({
						// scrollTop: ($(this).offset().top - $(this).scrollTop() - 70 - $('nav').offset().top)
						scrollTop: top
					}, 200, function (completed) {
						var color = obj.css('background-color');
						if (navFinished) {
							navFinished = false;
							$(obj).animate({
								'background-color': "rgb(255, 225, 55)"
							}, 200, function (c1) {
								$(obj).animate({
									'background-color': color
								}, 300, function (c1) {
									navFinished = true;
									navAnimated = true;
								});
							});
						}
					});
					navAnimated = true;
				}
			}
		});
	}
	var finished = true;
	$('a').click(function(){
		navScroll();
		var href = $(this).attr("href");
		if (href.match(/(^#|[a-zA-Z-_.]*#)/)) {
			var id = href.split('#', 2)[1];
			var obj = $(document.getElementById(id));

			$('html, body').animate({
				scrollTop: obj.offset().top
			}, 200, function (completed) {
				var color = obj.css('background-color');
				if (finished) {
					finished = false;
					$(obj).animate({
						'background-color': "rgb(255, 225, 55)"
					}, 200, function (c1) {
						$(obj).animate({
							'background-color': color
						}, 300, function (c1) {
							finished = true;
						});
					});
				}
			});
		};
	});
	var href = location.href;
	var hrefBasename = basename(href);
	if (href.match(/(^#|[a-zA-Z-_.]*#)/)) {
		var id = href.split('#', 2)[1];
		var obj = $(document.getElementById(id));
		$('html, body').animate({
			scrollTop: obj.offset().top
		}, 200, function (completed) {
			var color = obj.css('background-color');
			if (finished) {
				finished = false;
				$(obj).animate({
					'background-color': "rgb(255, 225, 55)"
				}, 200, function (c1) {
					$(obj).animate({
						'background-color': color
					}, 300, function (c1) {
						finished = true;
					});
				});
			}
		});
	} else {
		var obj = $('div#main');
		$('html, body').animate({
			scrollTop: obj.offset().top
		}, 200, function (completed) {
			var color = obj.css('background-color');
			if (finished) {
				finished = false;
				$(obj).animate({
					'background-color': "rgb(255, 225, 55)"
				}, 200, function (c1) {
					$(obj).animate({
						'background-color': color
					}, 300, function (c1) {
						finished = true;
					});
				});
			}
		});
	}

	navScroll();
});
