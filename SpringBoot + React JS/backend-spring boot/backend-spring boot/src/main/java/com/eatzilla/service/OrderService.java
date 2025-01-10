package com.eatzilla.service;

import java.util.List;

import com.eatzilla.Exception.CartException;
import com.eatzilla.Exception.OrderException;
import com.eatzilla.Exception.RestaurantException;
import com.eatzilla.Exception.UserException;
import com.eatzilla.model.Order;
import com.eatzilla.model.User;
import com.eatzilla.request.CreateOrderRequest;

public interface OrderService {
	
	 public void createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
