package com.example.desafio_iris.repository;

import com.example.desafio_iris.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByIngredientsDescriptionIn(List<String> ingredientDescriptions);

//    @Query("SELECT r FROM Recipe r WHERE SIZE(r.ingredients) >= :ingredientCount")
//    List<Recipe> findRecipesWithAtLeastIngredients(@Param("ingredientCount") int ingredientCount);
}
