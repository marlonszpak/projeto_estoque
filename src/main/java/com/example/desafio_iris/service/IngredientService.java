package com.example.desafio_iris.service;

import com.example.desafio_iris.model.Ingredient;
import com.example.desafio_iris.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient saveIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> getIngredientByDescription(String description) {
        return ingredientRepository.findByDescription(description);
    }

    public Ingredient update(Long id, Ingredient newIngredient) {
        Optional<Ingredient> optionalIngredient = ingredientRepository.findById(id);
        if (optionalIngredient.isPresent()) {
            Ingredient existingIngredient = optionalIngredient.get();
            existingIngredient.setDescription(newIngredient.getDescription());
            return ingredientRepository.save(existingIngredient);
        }
        return null;
    }
}

