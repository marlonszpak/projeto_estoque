import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RecipeModal = ({ isOpen, onRequestClose, onRecipeSaved, currentRecipe }) => {
  const [description, setDescription] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('http://localhost:8080/desafio/ingredients');
        if (!response.ok) {
          throw new Error('Erro ao buscar ingredientes');
        }
        const data = await response.json();
        setAllIngredients(data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    if (currentRecipe) {
      setDescription(currentRecipe.description);
      setSelectedIngredients(currentRecipe.ingredients.map(ing => ing.id));
    } else {
      setDescription('');
      setSelectedIngredients([]);
    }
  }, [currentRecipe]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError('');
  };

  const handleIngredientChange = (e) => {
    const ingredientId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setSelectedIngredients((prevSelectedIngredients) => {
      if (isChecked) {
        return [...prevSelectedIngredients, ingredientId];
      } else {
        return prevSelectedIngredients.filter((id) => id !== ingredientId);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || /\d/.test(description)) {
      setError('Descrição inválida. Não pode ser vazia ou conter números.');
      return;
    }

    if (selectedIngredients.length < 2) {
      setError('Selecione pelo menos dois ingredientes.');
      return;
    }

    const recipeData = {
      description,
      ingredients: selectedIngredients.map((id) => ({ id })),
    };

    try {
      const response = await fetch(currentRecipe ? `http://localhost:8080/desafio/recipes/${currentRecipe.id}` : 'http://localhost:8080/desafio/recipes', {
        method: currentRecipe ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar receita');
      }

      const data = await response.json();
      console.log('Receita salva:', data);

      onRecipeSaved(data);

      onRequestClose();
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Cadastrar Receita">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentRecipe ? 'Editar Receita' : 'Cadastrar Receita'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome da Receita</label>
                <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} />
              </div>
              <div>
                <h5>Ingredientes</h5>
                {allIngredients.map((ingredient) => (
                  <div className="form-check" key={ingredient.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={ingredient.id}
                      checked={selectedIngredients.includes(ingredient.id)}
                      onChange={handleIngredientChange}
                    />
                    <label className="form-check-label">
                      {ingredient.description}
                    </label>
                  </div>
                ))}
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Fechar</button>
                <button type="submit" className="btn btn-primary">{currentRecipe ? 'Salvar Alterações' : 'Cadastrar Receita'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;
