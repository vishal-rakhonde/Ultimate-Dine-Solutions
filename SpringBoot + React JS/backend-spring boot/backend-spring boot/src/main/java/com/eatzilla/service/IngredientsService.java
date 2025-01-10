package com.eatzilla.service;

import java.util.List;

import com.eatzilla.Exception.FoodException;
import com.eatzilla.Exception.RestaurantException;
import com.eatzilla.model.Food;
import com.eatzilla.model.IngredientCategory;
import com.eatzilla.model.IngredientsItem;
import com.eatzilla.repository.IngredientsCategoryRepository;

public interface IngredientsService {
	
	public IngredientCategory createIngredientsCategory(
			String name,Long restaurantId) throws RestaurantException;

	public IngredientCategory findIngredientsCategoryById(Long id) throws Exception;

	public List<IngredientCategory> findIngredientsCategoryByRestaurantId(Long id) throws Exception;
	
	public List<IngredientsItem> findRestaurantsIngredients(
			Long restaurantId);

	
	public IngredientsItem createIngredientsItem(Long restaurantId, 
			String ingredientName,Long ingredientCategoryId) throws Exception;

	public IngredientsItem updateStoke(Long id) throws Exception;
	
}
