package com.example.desafio_iris.controller;

import com.example.desafio_iris.model.Ingredient;
import com.example.desafio_iris.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/desafio/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredientToUpdate){
        Ingredient updatedIngredient = ingredientService.update(id, ingredientToUpdate);
        return updatedIngredient != null ? ResponseEntity.ok(updatedIngredient) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        try {
            ingredientService.deleteIngredient(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


