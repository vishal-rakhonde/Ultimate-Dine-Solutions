package com.eatzilla.request;



import java.util.List;

import com.eatzilla.model.Category;
import com.eatzilla.model.IngredientsItem;


public class CreateFoodRequest {
	

    
    private String name;
    private String description;
    private Long price;
    
  
    private Category category;
    private List<String> images;

   
    private Long restaurantId;
    
    private boolean vegetarian;
    private boolean seasonal;
    
    
    private List<IngredientsItem> ingredients;


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Long getPrice() {
		return price;
	}


	public void setPrice(Long price) {
		this.price = price;
	}


	public Category getCategory() {
		return category;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public List<String> getImages() {
		return images;
	}


	public void setImages(List<String> images) {
		this.images = images;
	}


	public Long getRestaurantId() {
		return restaurantId;
	}


	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}


	public boolean isVegetarian() {
		return vegetarian;
	}


	public void setVegetarian(boolean vegetarian) {
		this.vegetarian = vegetarian;
	}


	public boolean isSeasonal() {
		return seasonal;
	}


	public void setSeasonal(boolean seasonal) {
		this.seasonal = seasonal;
	}


	public List<IngredientsItem> getIngredients() {
		return ingredients;
	}


	public void setIngredients(List<IngredientsItem> ingredients) {
		this.ingredients = ingredients;
	}


	public CreateFoodRequest(String name, String description, Long price, Category category, List<String> images,
			Long restaurantId, boolean vegetarian, boolean seasonal, List<IngredientsItem> ingredients) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
		this.images = images;
		this.restaurantId = restaurantId;
		this.vegetarian = vegetarian;
		this.seasonal = seasonal;
		this.ingredients = ingredients;
	}


	public CreateFoodRequest() {
		super();
		// TODO Auto-generated constructor stub
	}


	@Override
	public String toString() {
		return "CreateFoodRequest [name=" + name + ", description=" + description + ", price=" + price + ", category="
				+ category + ", images=" + images + ", restaurantId=" + restaurantId + ", vegetarian=" + vegetarian
				+ ", seasonal=" + seasonal + ", ingredients=" + ingredients + "]";
	}
	

}
