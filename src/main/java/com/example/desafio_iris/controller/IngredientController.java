package com.example.desafio_iris.controller;

import com.example.desafio_iris.model.Ingredient;
import com.example.desafio_iris.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/desafio")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/ingredients")
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @GetMapping("/ingredients")
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @GetMapping("/ingredients/{description}")
    public ResponseEntity<Ingredient> getIngredientByDescription(@PathVariable String description) {
        Optional<Ingredient> ingredient = ingredientService.getIngredientByDescription(description);
        return ingredient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredientToUpdate){
        Ingredient updatedIngredient = ingredientService.update(id, ingredientToUpdate);
        return updatedIngredient != null ? ResponseEntity.ok(updatedIngredient) : ResponseEntity.notFound().build();
    }
}


