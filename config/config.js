module.exports = {
    development: {
        username: "dev",
        password: "dev",
        database: "database_development",
        path: "../library.db",
        dialect: "sqlite"
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": "database_test",
        "path": "../library.db",
        "dialect": "sqlite"
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": "database_production",
        "path": "../library.db",
        "dialect": "sqlite"
    }
};
