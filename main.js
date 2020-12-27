const express = require('express');
const bodyParser = require('body-parser');
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

        const app = express();
        const port = process.env.PORT|| 3000;

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/recipes', async function (req, res) {
            const recipes = await Recipe.findAll();
            res.send(recipes);
        });

        app.post('/recipe', async function (req, res) {
            try {
                const newRecipe = req.body;
                const response = await Recipe.create(newRecipe);
                res.send(response);
            } catch (error) {
                res.status(500).send("Unable to create recipe!");
            }
        });

        app.put('/recipe', async function (req, res) {
            try {
                const newRecipe = req.body;
                const id = newRecipe.id;
                delete newRecipe.id;

                await Recipe.update(newRecipe, {
                    where: { id },
                });

                res.sendStatus(200);
            } catch (error) {
                res.status(500).send("Unable to update recipe!");
            }
        });

        app.delete('/recipe', async function (req, res) {
            try {
                const id = req.body.id;

                await Recipe.destroy({
                    where: { id },
                });

                res.sendStatus(200);
            } catch (error) {
                res.status(500).send("Unable to delete recipe!");
            }
        });

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });

        //await sequelize.close();
    } catch (error) {
        console.error('An error occurred: ', error);
    }
};

(async () => await main())();