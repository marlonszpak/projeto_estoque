import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/product');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);


  const adicionarProduct = (novoProduct) => {
    setProducts([...products, novoProduct]);
  };

  const handleOpenProductModal = () => {
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditProduct(null);
  };

  const handleProductToggle = (id) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [id]: !prevSelectedProducts[id]
    }));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="container mt-4">

      <div className="row">
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Produtos</h2>
            <button className="btn btn-primary" onClick={handleOpenProductModal}>Cadastrar Produto</button>
          </div>
          <ul className="list-group">
            {products.map((product) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={product.id}>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedProducts[product.id] || false}
                    onChange={() => handleProductToggle(product.id)}
                  />
                  {' '}
                  {product.description}
                </div>
                <div>
                  <button className="btn btn-secondary mx-2" onClick={() => handleEditProduct(product)}>Editar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductModal
        isOpen={isProductModalOpen}
        onRequestClose={handleCloseProductModal}
        onProductAdded={adicionarProduct}
        productToEdit={editProduct}
      />
    </div>
  );
};

export default App;
