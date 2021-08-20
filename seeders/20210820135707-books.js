'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Books', [{
            title: 'A Brief History of Time',
            author: 'Stephen Hawking',
            genre: 'Non fiction',
            year: 1988
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Books', null, {});
    }
};
