package com.eatzilla.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eatzilla.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByFoodIsContaining

}
