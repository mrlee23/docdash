$(document).ready(function (){
	var finished = true;
	$('a').click(function(){
		var href = $(this).attr("href");
		if (href.match(/(^#|[a-zA-Z-_.]*#)/)) {
			var id = href.split('#', 2)[1];
			var obj = $(document.getElementById(id));
			$('html, body').animate({
				scrollTop: obj.offset().top
			}, 200, function (completed) {
				if (finished) {
					finished = false;
					var color = obj.css('background-color');
					$(obj).animate({
						'background-color': "rgb(255, 225, 55)"
					}, 100, function (c1) {
						$(obj).animate({ // delay
							'background-color': "rgb(255, 225, 55)"
						}, 100, function (c2) {
							$(obj).animate({
								'background-color': color
							}, 500, function (c3) {
								finished = true;
							});
						});
					});
				}
			});
		}
	});
});
