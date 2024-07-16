import React, { useState, useEffect } from 'react';
import IngredienteModal from './IngredienteModal';
import RecipeModal from './recipeModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [editIngredient, setEditIngredient] = useState(null);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const response = await fetch('http://localhost:8080/desafio/ingredients');
        if (!response.ok) {
          throw new Error('Erro ao buscar ingredientes');
        }
        const data = await response.json();
        setIngredientes(data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    };

    fetchIngredientes();
  }, []);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await fetch('http://localhost:8080/desafio/recipes');
        if (!response.ok) {
          throw new Error('Erro ao buscar receitas');
        }
        const data = await response.json();
        setReceitas(data);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    };

    fetchReceitas();
  }, []);

  const adicionarIngrediente = (novoIngrediente) => {
    setIngredientes([...ingredientes, novoIngrediente]);
  };

  const handleOpenIngredientModal = () => {
    setIsIngredientModalOpen(true);
  };

  const handleCloseIngredientModal = () => {
    setIsIngredientModalOpen(false);
    setEditIngredient(null);
  };

  const handleOpenRecipeModal = (recipe = null) => {
    setCurrentRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const handleCloseRecipeModal = () => {
    setIsRecipeModalOpen(false);
    setCurrentRecipe(null);
  };

  const handleRecipeSaved = (savedRecipe) => {
    if (currentRecipe) {
      setReceitas(receitas.map((rec) => (rec.id === savedRecipe.id ? savedRecipe : rec)));
    } else {
      setReceitas([...receitas, savedRecipe]);
    }
  };

  const handleIngredientToggle = (id) => {
    setSelectedIngredients((prevSelectedIngredients) => ({
      ...prevSelectedIngredients,
      [id]: !prevSelectedIngredients[id]
    }));
  };

  const handleEditIngredient = (ingredient) => {
    setEditIngredient(ingredient);
    setIsIngredientModalOpen(true);
  };

  
  const isRecipeComplete = (recipe) => {
    return recipe.ingredients.every(ingredient => selectedIngredients[ingredient.id]);
  };

  const isRecipeAlmostComplete = (recipe) => {
    const unselectedIngredients = recipe.ingredients.filter(ingredient => !selectedIngredients[ingredient.id]);
    return unselectedIngredients.length === 1;
  };

  return (
    <div className="container mt-4">
      <div className="border-bottom">
        <h1>Desafio Receitas!</h1>
        <p>Selecione os ingredientes que você possui. <br></br> Se a receita ficar Amarela é porque falta apenas um ingrediente para ela ficar completa. <br></br> Se a receita ficar Verde é porque você tem todos os ingredientes dela !</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Ingredientes</h2>
            <button className="btn btn-primary" onClick={handleOpenIngredientModal}>Cadastrar Ingrediente</button>
          </div>
          <ul className="list-group">
            {ingredientes.map((ingrediente) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={ingrediente.id}>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedIngredients[ingrediente.id] || false}
                    onChange={() => handleIngredientToggle(ingrediente.id)}
                  />
                  {' '}
                  {ingrediente.description}
                </div>
                <div>
                  <button className="btn btn-secondary mx-2" onClick={() => handleEditIngredient(ingrediente)}>Editar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Receitas</h2>
            <button className="btn btn-primary" onClick={() => handleOpenRecipeModal()}>Cadastrar Receita</button>
          </div>
          <ul className="list-group">
            {receitas.map((receita) => (
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${isRecipeComplete(receita) ? 'bg-success text-white' : isRecipeAlmostComplete(receita) ? 'bg-warning' : ''}`}
                key={receita.id}
              >
                {receita.description}
                <button className="btn btn-secondary" onClick={() => handleOpenRecipeModal(receita)}>Editar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <IngredienteModal
        isOpen={isIngredientModalOpen}
        onRequestClose={handleCloseIngredientModal}
        onIngredientAdded={adicionarIngrediente}
        ingredientToEdit={editIngredient}
      />
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onRequestClose={handleCloseRecipeModal}
        onRecipeSaved={handleRecipeSaved}
        currentRecipe={currentRecipe}
      />
    </div>
  );
};

export default App;
