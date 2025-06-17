import React from 'react';
import { Recipe } from '../App';
import RecipeCard from './RecipeCard';

interface Props {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedRecipe: Omit<Recipe, 'id'>) => void;
}

const RecipeList: React.FC<Props> = ({ recipes, onDelete, onUpdate }) => {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default RecipeList;