const { Sequelize, DataTypes } = require('sequelize');

const main = async () => {
    try {
        const sequelize = new Sequelize(
            process.env.DB_NAME || 'recipe_app',
            process.env.DB_USER || 'root',
            process.env.DB_PASSWORD || '',
            {
                host: process.env.DB_HOST || 'localhost',
                dialect: 'mysql',
            }
        );

        const Recipe = sequelize.define('Recipe', {
            name: {
                type: DataTypes.STRING,
            },
            url: {
                type: DataTypes.STRING,
            },
            have_made: {
                type: DataTypes.BOOLEAN,
            },
        }, {
            timestamps: false,
            freezeTableName: true,
        });

        const recipes = await Recipe.findAll();
        console.log(recipes);

        await sequelize.close();
    } catch (error) {
        console.error('An error occurred: ', error);
    }
};

(async () => await main())();