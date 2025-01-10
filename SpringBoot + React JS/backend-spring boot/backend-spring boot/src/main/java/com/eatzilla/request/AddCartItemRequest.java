package com.eatzilla.request;

import java.util.List;

public class AddCartItemRequest {
	
	private Long menuItemId;
	private int quantity;
	private List<String> ingredients;
	public Long getMenuItemId() {
		return menuItemId;
	}
	public void setMenuItemId(Long menuItemId) {
		this.menuItemId = menuItemId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public List<String> getIngredients() {
		return ingredients;
	}
	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}
	public AddCartItemRequest(Long menuItemId, int quantity, List<String> ingredients) {
		super();
		this.menuItemId = menuItemId;
		this.quantity = quantity;
		this.ingredients = ingredients;
	}
	public AddCartItemRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "AddCartItemRequest [menuItemId=" + menuItemId + ", quantity=" + quantity + ", ingredients="
				+ ingredients + "]";
	}

	
}
