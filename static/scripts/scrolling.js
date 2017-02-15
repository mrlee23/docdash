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
});
