// App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import './styles/App.css';

export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  cook_time: number;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const res = await axios.get<Recipe[]>('/api/recipes');
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async (recipe: Omit<Recipe, 'id'>) => {
    await axios.post('/api/recipes', recipe);
    fetchRecipes();
  };

  const updateRecipe = async (id: number, updatedRecipe: Omit<Recipe, 'id'>) => {
    await axios.put(`/api/recipes/${id}`, updatedRecipe);
    fetchRecipes();
  };

  const deleteRecipe = async (id: number) => {
    await axios.delete(`/api/recipes/${id}`);
    fetchRecipes();
  };

  return (
    <div className="container">
      <h1> My Recipe Book</h1>
      <RecipeForm onAdd={addRecipe} />
      <RecipeList recipes={recipes} onDelete={deleteRecipe} onUpdate={updateRecipe} />
    </div>
  );
};

export default App;
