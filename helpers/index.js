'use strict';


function Helper() {}

Helper.limit = 5;

Helper.pagination = function (params, total) {
    let totalPages = parseInt(total / this.limit);
    let current = parseInt(params.page) || 1;
    let search = params.search || '';

    let pages = [...Array(totalPages).keys()].map(page => {
        return {
            href: `?search=${search}&page=${page + 1}`,
            class: page + 1 == current ? 'active' : ''
        };
    });

    return {
        current: current,
        pages: pages,
        prev: current > 1,
        next: current < totalPages,
        hasPages: totalPages > 0
    };
};


module.exports = Helper;
