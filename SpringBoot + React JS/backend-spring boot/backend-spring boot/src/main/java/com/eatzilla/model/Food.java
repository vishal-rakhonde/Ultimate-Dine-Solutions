package com.eatzilla.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity

public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private Long price;
    
    @ManyToOne
    private Category foodCategory;


    @ElementCollection
    @Column(length = 1000)
    private List<String> images;

    private boolean available;

//    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant;
    
    private boolean isVegetarian;
    private boolean isSeasonal;
    
    @ManyToMany
    private List<IngredientsItem> ingredients=new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

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

	public Category getFoodCategory() {
		return foodCategory;
	}

	public void setFoodCategory(Category foodCategory) {
		this.foodCategory = foodCategory;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public boolean isVegetarian() {
		return isVegetarian;
	}

	public void setVegetarian(boolean isVegetarian) {
		this.isVegetarian = isVegetarian;
	}

	public boolean isSeasonal() {
		return isSeasonal;
	}

	public void setSeasonal(boolean isSeasonal) {
		this.isSeasonal = isSeasonal;
	}

	public List<IngredientsItem> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<IngredientsItem> ingredients) {
		this.ingredients = ingredients;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Food(Long id, String name, String description, Long price, Category foodCategory, List<String> images,
			boolean available, Restaurant restaurant, boolean isVegetarian, boolean isSeasonal,
			List<IngredientsItem> ingredients, Date creationDate) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.foodCategory = foodCategory;
		this.images = images;
		this.available = available;
		this.restaurant = restaurant;
		this.isVegetarian = isVegetarian;
		this.isSeasonal = isSeasonal;
		this.ingredients = ingredients;
		this.creationDate = creationDate;
	}

	public Food(String name, String description, Long price, Category foodCategory, List<String> images,
			boolean available, Restaurant restaurant, boolean isVegetarian, boolean isSeasonal,
			List<IngredientsItem> ingredients, Date creationDate) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.foodCategory = foodCategory;
		this.images = images;
		this.available = available;
		this.restaurant = restaurant;
		this.isVegetarian = isVegetarian;
		this.isSeasonal = isSeasonal;
		this.ingredients = ingredients;
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		return "Food [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", foodCategory=" + foodCategory + ", images=" + images + ", available=" + available + ", restaurant="
				+ restaurant + ", isVegetarian=" + isVegetarian + ", isSeasonal=" + isSeasonal + ", ingredients="
				+ ingredients + ", creationDate=" + creationDate + "]";
	}

	public Food() {
		super();
	}

    
    
}
