import React, { useState } from 'react';
import Modal from 'react-modal';

const IngredienteModal = ({ isOpen, onRequestClose, onIngredientAdded }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || /\d/.test(description)) {
      setError('Descrição inválida. Não pode ser vazia ou conter números.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/desafio/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar ingrediente');
      }

      const data = await response.json();
      console.log('Ingrediente cadastrado:', data);

      onIngredientAdded(data);
      setDescription('');
      onRequestClose();
    } catch (error) {
      console.error('Erro ao cadastrar ingrediente:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cadastrar Ingrediente</h5>
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
                <button type="submit" className="btn btn-primary">Cadastrar Ingrediente</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IngredienteModal;
