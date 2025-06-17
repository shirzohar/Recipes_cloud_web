import React, { useState } from 'react';
import { Recipe } from '../App';
import EditModal from './EditModal';

interface Props {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedRecipe: Omit<Recipe, 'id'>) => void;
}

const RecipeCard: React.FC<Props> = ({ recipe, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <p><b>Ingredients:</b> {recipe.ingredients}</p>
      <p><b>Instructions:</b> {recipe.instructions}</p>
      <p><b>Cook Time:</b> {recipe.cook_time} min</p>
      <div className="card-buttons">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(recipe.id)}>Delete</button>
      </div>
      {isEditing && (
        <EditModal recipe={recipe} onClose={() => setIsEditing(false)} onSave={onUpdate} />
      )}
    </div>
  );
};

export default RecipeCard;
