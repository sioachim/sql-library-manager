'use strict';


function Helper() {}

Helper.limit = 5;

Helper.pagination = function (current, total) {
    let pages = parseInt(total / this.limit);

    return {
        current: current,
        pages: [...Array(pages).keys()],
        prev: current > 1,
        next: current < pages
    };
};


module.exports = Helper;
