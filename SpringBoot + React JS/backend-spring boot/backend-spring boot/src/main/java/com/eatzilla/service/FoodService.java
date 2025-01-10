package com.eatzilla.service;

import java.util.List;

import com.eatzilla.Exception.FoodException;
import com.eatzilla.Exception.RestaurantException;
import com.eatzilla.model.Category;
import com.eatzilla.model.Food;
import com.eatzilla.model.Restaurant;
import com.eatzilla.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req,Category category,
						   Restaurant restaurant) throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws FoodException;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
