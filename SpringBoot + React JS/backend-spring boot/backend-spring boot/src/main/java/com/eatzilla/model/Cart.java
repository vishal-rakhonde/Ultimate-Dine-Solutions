package com.eatzilla.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity

public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "customer_id"  )
	private User customer;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CartItem> items = new ArrayList<>();
	
	private Long total;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Cart(Long id, User customer, List<CartItem> items, Long total) {
		super();
		this.id = id;
		this.customer = customer;
		this.items = items;
		this.total = total;
	}

	public Cart(User customer, List<CartItem> items, Long total) {
		super();
		this.customer = customer;
		this.items = items;
		this.total = total;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", customer=" + customer + ", items=" + items + ", total=" + total + "]";
	}

	public Cart() {
		super();
	}
	
	

}
