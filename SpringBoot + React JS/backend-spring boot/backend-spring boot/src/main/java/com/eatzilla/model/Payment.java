package com.eatzilla.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity

public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private String paymentMethod;
    private String paymentStatus;
    private double totalAmount;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Payment(Long id, Long orderId, String paymentMethod, String paymentStatus, double totalAmount,
			Date createdAt) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.paymentMethod = paymentMethod;
		this.paymentStatus = paymentStatus;
		this.totalAmount = totalAmount;
		this.createdAt = createdAt;
	}

	public Payment(Long orderId, String paymentMethod, String paymentStatus, double totalAmount, Date createdAt) {
		super();
		this.orderId = orderId;
		this.paymentMethod = paymentMethod;
		this.paymentStatus = paymentStatus;
		this.totalAmount = totalAmount;
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Payment [id=" + id + ", orderId=" + orderId + ", paymentMethod=" + paymentMethod + ", paymentStatus="
				+ paymentStatus + ", totalAmount=" + totalAmount + ", createdAt=" + createdAt + "]";
	}

	public Payment() {
		super();
	}
    
    
}

