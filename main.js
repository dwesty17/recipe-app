const { Sequelize, DataTypes } = require('sequelize');

const express = require('express');


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

        const app = express();
        const port = process.env.PORT|| 3000;

        app.get('/recipes', async function (req, res) {
            const recipes = await Recipe.findAll();
            res.send(recipes);
        })

        app.post('/recipe', function (req, res) {
            res.send('Got a POST request')
        })

        app.put('/recipe', function (req, res) {
            res.send('Got a PUT request at /user')
        })

        app.delete('/recipe', function (req, res) {
            res.send('Got a DELETE request at /user')
        })

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })

        //await sequelize.close();
    } catch (error) {
        console.error('An error occurred: ', error);
    }
};

(async () => await main())();