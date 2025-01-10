package com.eatzilla.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity

public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Food food;
    
    private int quantity;
    private Long totalPrice;
    
    private List<String> ingredients;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Food getFood() {
		return food;
	}

	public void setFood(Food food) {
		this.food = food;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<String> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}

	public OrderItem(Long id, Food food, int quantity, Long totalPrice, List<String> ingredients) {
		super();
		this.id = id;
		this.food = food;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.ingredients = ingredients;
	}

	public OrderItem(Food food, int quantity, Long totalPrice, List<String> ingredients) {
		super();
		this.food = food;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.ingredients = ingredients;
	}

	@Override
	public String toString() {
		return "OrderItem [id=" + id + ", food=" + food + ", quantity=" + quantity + ", totalPrice=" + totalPrice
				+ ", ingredients=" + ingredients + "]";
	}

	public OrderItem() {
		super();
	}
    
    
}

