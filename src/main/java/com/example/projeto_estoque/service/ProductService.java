package com.example.projeto_estoque.service;

import com.example.projeto_estoque.model.Product;
import com.example.projeto_estoque.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product update(Long id, Product newProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(newProduct.getName());
            existingProduct.setAmount(newProduct.getAmount());
            existingProduct.setReference(newProduct.getReference());
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Produto não encontrado com id: " + id);
        }
    }

    public void deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Produto não encontrado com id: " + id);
        }
    }
}

