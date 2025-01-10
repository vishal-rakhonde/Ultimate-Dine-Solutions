package com.eatzilla.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eatzilla.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
