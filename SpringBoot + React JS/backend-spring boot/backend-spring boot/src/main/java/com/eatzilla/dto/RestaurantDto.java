package com.eatzilla.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;


@Embeddable
public class RestaurantDto {
	
	private String title;


	@Column(length = 1000)
	private List<String> images;

	private String description;
	private Long id;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<String> getImages() {
		return images;
	}
	public void setImages(List<String> images) {
		this.images = images;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public RestaurantDto(String title, List<String> images, String description, Long id) {
		super();
		this.title = title;
		this.images = images;
		this.description = description;
		this.id = id;
	}
	public RestaurantDto(String title, List<String> images, String description) {
		super();
		this.title = title;
		this.images = images;
		this.description = description;
	}
	public RestaurantDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "RestaurantDto [title=" + title + ", images=" + images + ", description=" + description + ", id=" + id
				+ "]";
	}
	

}
