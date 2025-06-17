import React, { useState } from 'react';
import { Recipe } from '../App';

interface Props {
  recipe: Recipe;
  onClose: () => void;
  onSave: (id: number, updatedRecipe: Omit<Recipe, 'id'>) => void;
}

const EditModal: React.FC<Props> = ({ recipe, onClose, onSave }) => {
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [cookTime, setCookTime] = useState(recipe.cook_time);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(recipe.id, { title, ingredients, instructions, cook_time: cookTime });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Recipe</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} required />
          <textarea value={instructions} onChange={e => setInstructions(e.target.value)} required />
          <input type="number" value={cookTime} onChange={e => setCookTime(Number(e.target.value))} required />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
