package com.eatzilla.request;

public class CreateIngredientCategoryRequest {

    private Long restaurantId;
    private String name;
	public Long getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public CreateIngredientCategoryRequest(Long restaurantId, String name) {
		super();
		this.restaurantId = restaurantId;
		this.name = name;
	}
	public CreateIngredientCategoryRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "CreateIngredientCategoryRequest [restaurantId=" + restaurantId + ", name=" + name + "]";
	}
    
    
}
