const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// קובץ הנתונים
const recipesFile = './recipes.json';

function readRecipes() {
  try {
    const data = fs.readFileSync(recipesFile);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeRecipes(recipes) {
  fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
}

app.get('/api/recipes', (req, res) => {
  const recipes = readRecipes();
  res.json(recipes);
});

app.post('/api/recipes', (req, res) => {
  const recipes = readRecipes();
  const { title, ingredients, instructions, cook_time } = req.body;

  const newRecipe = {
    id: recipes.length ? recipes[recipes.length - 1].id + 1 : 1,
    title,
    ingredients,
    instructions,
    cook_time
  };

  recipes.push(newRecipe);
  writeRecipes(recipes);
  res.json(newRecipe);
});

app.put('/api/recipes/:id', (req, res) => {
  const recipes = readRecipes();
  const { id } = req.params;
  const { title, ingredients, instructions, cook_time } = req.body;

  const recipeIndex = recipes.findIndex(r => r.id == id);
  if (recipeIndex === -1) {
    return res.status(404).send('Recipe not found');
  }

  recipes[recipeIndex] = {
    id: parseInt(id),
    title,
    ingredients,
    instructions,
    cook_time
  };

  writeRecipes(recipes);
  res.json(recipes[recipeIndex]);
});

app.delete('/api/recipes/:id', (req, res) => {
  let recipes = readRecipes();
  const { id } = req.params;

  const recipeIndex = recipes.findIndex(r => r.id == id);
  if (recipeIndex === -1) {
    return res.status(404).send('Recipe not found');
  }

  recipes = recipes.filter(r => r.id != id);
  writeRecipes(recipes);
  res.sendStatus(204);
});

// משרת את ה-Frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
