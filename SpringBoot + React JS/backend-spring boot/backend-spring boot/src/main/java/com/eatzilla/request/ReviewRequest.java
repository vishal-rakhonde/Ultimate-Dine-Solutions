package com.eatzilla.request;

public class ReviewRequest {

    private Long restaurantId;
    
    private double rating;
    
    private String reviewText;

	public Long getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getReviewText() {
		return reviewText;
	}

	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

	public ReviewRequest(Long restaurantId, double rating, String reviewText) {
		super();
		this.restaurantId = restaurantId;
		this.rating = rating;
		this.reviewText = reviewText;
	}

	public ReviewRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ReviewRequest [restaurantId=" + restaurantId + ", rating=" + rating + ", reviewText=" + reviewText
				+ "]";
	}
    
    
	
}
