function buildMemberNav_changelog(items, itemHeading, itemsSeen, linktoFn) {
    var nav = '';

	var genModuleWrapper = function (objs, objsLongname) {
		var ret = '';
		if (_.isObject(objs) && _.size(objs) > 0) {
			var meta = objs.meta;
			var longname = '';
			var changelogs = '';
			var name = '';
			if (_.isObject(meta) && _.size(meta) > 0) {
				name = meta.name;
				longname = meta.longname;
				changelogs = genChangelogs(meta, meta.changelog);
			} else {
				longname = objsLongname;
				name = longname.replace(/^module:/, '');
			}
			var members = objs.members;
			ret += '<li>';
			ret += linkto(longname, name);
			ret += changelogs;
			ret += genMemberWrapper(members);
			ret += '</li>';
		};
		return ret;
	};
	var genMemberWrapper = function (objs) {
		var ret = '';
		if (_.isObject(objs) && _.size(objs) > 0) {
			_.forEach(objs, function (value, kind) {
				ret += `<ul class="${kind} member">`;
				ret += `<li class="label">${kind}`;
				_.forEach(value, function (o, longname) {
					var name = o.name;
					ret += '<li>';
					ret += linkto(longname, name);
					ret += genChangelogs(o, o.changelog);
					ret += '</li>';
				});
				ret += '</li>';
				ret += '</ul>';
			});
		}
		return ret;
	};
	var genChangelogs = function (parentObj, changelogs) {
		var ret = '';
		if (changelogs && changelogs.length) {
			ret += "<ul class='changelogs'>";
			changelogs.forEach(function (changelog) {
				var version = changelog.type.names[0];
				var defaultvalue = changelog.defaultvalue;
				var datetime = changelog.name;
				var desc = changelog.description;
				ret += "<li class='changelog'>";
				ret += linkto(parentObj.longname, `<span class="version">${version}</span> <span class="date">${datetime}</span> <span class="status">${defaultvalue}</span>`);
				ret += "</li>";
			});
			ret += "</ul>";
		}
		return ret;
	};
    if (items && items.length) {
		var dataObj = {};
        var itemsNav = '';

        items.forEach(function(item) {
			var kind = item.kind;
			var memberof = item.memberof;
			var longname = item.longname;
			if (memberof) {
				_.set(dataObj, [memberof, 'members', kind, longname], item);
			} else {
				_.set(dataObj, [longname, 'meta'], item);
			}
        });

		_.forEach(dataObj, function (value, key) {
			itemsNav += genModuleWrapper(value, key);
		});

        if (itemsNav !== '') {
            nav += '<h3>' + itemHeading + '</h3><ul class="changelogs-nav">' + itemsNav + '</ul>';
        }
    }

    return nav;
}
