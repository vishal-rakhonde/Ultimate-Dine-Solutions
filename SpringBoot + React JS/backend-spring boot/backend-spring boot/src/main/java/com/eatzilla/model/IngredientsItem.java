package com.eatzilla.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity

public class IngredientsItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String name;

	@ManyToOne
	private IngredientCategory category;
	
	@JsonIgnore
	@ManyToOne
	private Restaurant restaurant;
	
	private boolean inStoke=true;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public IngredientCategory getCategory() {
		return category;
	}

	public void setCategory(IngredientCategory category) {
		this.category = category;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public boolean isInStoke() {
		return inStoke;
	}

	public void setInStoke(boolean inStoke) {
		this.inStoke = inStoke;
	}

	public IngredientsItem(Long id, String name, IngredientCategory category, Restaurant restaurant, boolean inStoke) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
		this.restaurant = restaurant;
		this.inStoke = inStoke;
	}

	public IngredientsItem(String name, IngredientCategory category, Restaurant restaurant, boolean inStoke) {
		super();
		this.name = name;
		this.category = category;
		this.restaurant = restaurant;
		this.inStoke = inStoke;
	}

	@Override
	public String toString() {
		return "IngredientsItem [id=" + id + ", name=" + name + ", category=" + category + ", restaurant=" + restaurant
				+ ", inStoke=" + inStoke + "]";
	}

	public IngredientsItem() {
		super();
	}
	
	

}
