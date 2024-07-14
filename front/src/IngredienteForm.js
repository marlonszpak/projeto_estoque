import React, { useState } from 'react';

const IngredienteForm = ({ onIngredientAdded }) => {
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
    } catch (error) {
      console.error('Erro ao cadastrar ingrediente:', error);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">Cadastro de Ingrediente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} />
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar Ingrediente</button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default IngredienteForm;
