import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const IngredienteModal = ({ isOpen, onRequestClose, onIngredientAdded, ingredientToEdit }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (ingredientToEdit) {
      setDescription(ingredientToEdit.description);
      setIsEditing(true);
    } else {
      setDescription('');
      setIsEditing(false);
    }
  }, [ingredientToEdit]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invalidCharacters = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/;

    if (!description || /\d/.test(description) || invalidCharacters.test(description)) {
      setError('Descrição inválida. Não pode ser vazia, conter números ou caracteres especiais.');
      return;
    }

    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:8080/desafio/ingredients/${ingredientToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });
        window.location.reload();
      } else {
        response = await fetch('http://localhost:8080/desafio/ingredients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });
        window.location.reload();
      }

      if (!response.ok) {
        throw new Error(isEditing ? 'Erro ao atualizar ingrediente' : 'Erro ao cadastrar ingrediente');
      }

      const data = await response.json();
      console.log(isEditing ? 'Ingrediente atualizado:' : 'Ingrediente cadastrado:', data);

      onIngredientAdded(data);
      setDescription('');
      onRequestClose();
    } catch (error) {
      console.error(isEditing ? 'Erro ao atualizar ingrediente:' : 'Erro ao cadastrar ingrediente:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? 'Editar Ingrediente' : 'Cadastrar Ingrediente'}</h5>
            <button type="button" className="btn-close" onClick={onRequestClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Salvar Alterações' : 'Cadastrar Ingrediente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IngredienteModal;
