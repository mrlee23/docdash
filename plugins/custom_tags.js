/** @private */
function setDocletKindToTitleCustom(doclet, tag) {
    // doclet.addTag( 'custom_kind', tag.title );
	doclet.custom_kind = tag.title;
}

function setDocletNameToValueCustom(doclet, tag) {
    if (tag.value && tag.value.description) { // as in a long tag
		doclet.changelog_name = tag.value.description;
    }
    else if (tag.text) { // or a short tag
		doclet.changelog_name = tag.text;
    }
}

exports.defineTags = function(dictionary) {
	dictionary.defineTag('created', {
		mustHaveValue: true,
		onTagged : function(doclet, tag) {
			doclet.created = tag.value;
		}
	});
	dictionary.defineTag('modified', {
		mustHaveValue: true,
		onTagged : function(doclet, tag) {
			doclet.modified = tag.value;
		}
	});
	dictionary.defineTag('todo', {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.todo = doclet.todo || [];
            doclet.todo.push(tag.value || {});
			doclet.kind_todolist = 'todolist';
        }
	});
	dictionary.defineTag('fixme', {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.fixme = doclet.fixme || [];
            doclet.fixme.push(tag.value || {});
			doclet.kind_todolist = 'todolist';
        }
	});
	dictionary.defineTag('done', {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.done = doclet.done || [];
            doclet.done.push(tag.value || {});
			doclet.kind_todolist = 'todolist';
        }
	});
	dictionary.defineTag('changelog', {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.changelog = doclet.changelog || [];
            doclet.changelog.push(tag.value || {});
			doclet.kind_changelog = tag.title;
        }
	});
};
exports.handlers = {
    newDoclet: function(e) {
    }
};
