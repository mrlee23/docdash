function search(str, obj) {
	var flag = false;

	var fadeIn = function (jq) {
		jq.removeClass('fade-out');
		jq.addClass('fade-in');
	};
	var fadeOut = function (jq) {
		jq.removeClass('fade-in');
		jq.addClass('fade-out');
	};

	var highlightIn = function (jq, str) {
		if (!jq.children('a').children('span.highlight').length) {
			jq.children('a').html("<span class='highlight'>" + jq.children('a').html() + "</span>");
		}
	};

	var highlightOut = function (jq) {
		if (jq.children('a').children('span.highlight').length) {
			jq.children('a').children('span.highlight').parent().html(jq.children('a').children('span.highlight').html());
		}
	};

	var show = function (jq) {
		fadeIn(jq);
	};
	var hide = function (jq) {
		fadeOut(jq);
	};

	$(obj).each(function (key, value) {
		if (str.length == 0) { // init
			show($(value));
			$(value).removeClass(['fade-in', 'fade-out']);
			highlightOut($(value));
		} else if ($(value).children('a').text().match(new RegExp(str, 'i'))) { // show
			show($(value));
			highlightIn($(value), str);
			flag = true;
		} else {
			if ($(value).children('ul').length) {
				if (search(str, $(value).children('ul').children('li'))) { // show
					show($(value));
					highlightIn($(value), str);
					flag = true;
				} else { // hide
					hide($(value));
					highlightOut($(value));
				}
			} else { // hide
				hide($(value));
				highlightOut($(value));
			}
		}
	});
	return flag;
}
$(document).ready(function () {
	$('.nav-search input').bind({
		keyup: function () { search($('.nav-search input').val(), $('nav ul li')); }
	});
});
