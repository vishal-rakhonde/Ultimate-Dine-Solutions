package com.eatzilla.request;

public class UpdateCartItemRequest {
	
	private Long cartItemId;
	private int quantity;
	public Long getCartItemId() {
		return cartItemId;
	}
	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public UpdateCartItemRequest(Long cartItemId, int quantity) {
		super();
		this.cartItemId = cartItemId;
		this.quantity = quantity;
	}
	public UpdateCartItemRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "UpdateCartItemRequest [cartItemId=" + cartItemId + ", quantity=" + quantity + "]";
	}
	
}
