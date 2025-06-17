import React, { useState } from 'react';
import { Recipe } from '../App';

interface Props {
  onAdd: (recipe: Omit<Recipe, 'id'>) => void;
}

const RecipeForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, ingredients, instructions, cook_time: cookTime });
    setTitle('');
    setIngredients('');
    setInstructions('');
    setCookTime(0);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
      <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} required />
      <input type="number" placeholder="Cook Time (min)" value={cookTime} onChange={e => setCookTime(Number(e.target.value))} required />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
