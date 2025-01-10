package com.eatzilla.service;

import com.eatzilla.Exception.CartException;
import com.eatzilla.Exception.CartItemException;
import com.eatzilla.Exception.FoodException;
import com.eatzilla.Exception.UserException;
import com.eatzilla.model.Cart;
import com.eatzilla.model.CartItem;
import com.eatzilla.model.Food;
import com.eatzilla.model.User;
import com.eatzilla.request.AddCartItemRequest;
import com.eatzilla.request.UpdateCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
