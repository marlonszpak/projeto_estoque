package com.example.desafio_iris.service;

import com.example.desafio_iris.model.Recipe;
import com.example.desafio_iris.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(Long id) {
        return recipeRepository.findById(id);
    }

    public List<Recipe> findRecipesByIngredients(List<String> ingredientDescriptions) {
        return recipeRepository.findByIngredientsDescriptionIn(ingredientDescriptions);
    }

    public Recipe update(Long id, Recipe newRecipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            existingRecipe.setDescription(newRecipe.getDescription());
            existingRecipe.setIngredients(newRecipe.getIngredients());
            return recipeRepository.save(existingRecipe);
        }
        return null; // or throw an exception
    }
}
