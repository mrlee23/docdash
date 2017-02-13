function search(str, obj) {
	var flag = false;
	$(obj).each(function (key, value) {
		if (str.length == 0) {
			$(value).show();
			$(value).removeClass('search-highlight');
		} else if ($(value).children('a').text().match(new RegExp(str, 'i'))) {
			$(value).show();
			$(value).addClass('search-highlight');
			flag = true;
		} else {
			if ($(value).children('ul').length) {
				if (search(str, $(value).children('ul').children('li'))) {
					$(value).show();
					$(value).addClass('search-highlight');
					flag = true;
				} else {
					$(value).hide();
					$(value).removeClass('search-highlight');
				}
			} else {
				$(value).hide();
				$(value).removeClass('search-highlight');
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
