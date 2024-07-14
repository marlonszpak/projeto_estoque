package com.example.desafio_iris.controller;

import com.example.desafio_iris.model.Ingredient;
import com.example.desafio_iris.model.Recipe;
import com.example.desafio_iris.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/desafio/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.saveRecipe(recipe);
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/search")
    public List<Recipe> findRecipesByIngredients(@RequestParam List<String> ingredients) {
        return recipeService.findRecipesByIngredients(ingredients);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(
            @PathVariable Long id,
            @RequestBody Recipe recipeToUpdate) {
        Recipe updatedRecipe = recipeService.update(id, recipeToUpdate);
        return updatedRecipe != null ? ResponseEntity.ok(updatedRecipe) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/ingredients")
    public ResponseEntity<List<Ingredient>> getIngredientsForRecipe(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeService.findById(id);
        if (recipe.isPresent()) {
            List<Ingredient> ingredients = recipe.get().getIngredients();
            return ResponseEntity.ok(ingredients);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/compatible")
//    public List<Recipe> findCompatibleRecipes() {
//        // Aqui definimos "quase compatíveis" como receitas que têm pelo menos 75% dos ingredientes
//        int minIngredientCount = (int) Math.ceil(0.75 * 4); // 75% de 4 ingredientes
//        return recipeService.findRecipesWithAtLeastIngredients(minIngredientCount);
//    }
}


