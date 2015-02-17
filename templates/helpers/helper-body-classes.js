'use strict';

// Export name is the camelCase name of the helper
// The file is named helper-<helper-name>.js
module.exports.bodyClasses = function (context) {
    var classes = [],
        page = context.data.root,
        isPost = ('post' in page && page.post === true),
        type = (isPost) ? 'post' : 'page';

    classes.push(type);
    classes.push(page.src.name);

    return classes.join(' ');
};
