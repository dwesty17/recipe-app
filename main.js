const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'recipe_app',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    }
);

const main = async () => {
    try {
        await sequelize.authenticate();

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

        const allRecipes = await Recipe.findAll();
        console.log(allRecipes);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

(async () => await main())();