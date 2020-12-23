const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('recipe_app', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

(async () => await main())();