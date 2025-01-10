package com.eatzilla.request;

import com.eatzilla.model.Address;


public class CreateOrderRequest {
 
	private Long restaurantId;
	
	private Address deliveryAddress;

	public Long getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Address getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(Address deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public CreateOrderRequest(Long restaurantId, Address deliveryAddress) {
		super();
		this.restaurantId = restaurantId;
		this.deliveryAddress = deliveryAddress;
	}

	public CreateOrderRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "CreateOrderRequest [restaurantId=" + restaurantId + ", deliveryAddress=" + deliveryAddress + "]";
	}
	
    
}
