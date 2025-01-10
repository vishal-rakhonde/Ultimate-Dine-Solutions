package com.eatzilla.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String fullName;

	private String streetAddress;

	private String city;

	private String state;

	private String postalCode;

	private String country;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Address(Long id, String fullName, String streetAddress, String city, String state, String postalCode,
			String country) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.streetAddress = streetAddress;
		this.city = city;
		this.state = state;
		this.postalCode = postalCode;
		this.country = country;
	}

	
	
	public Address(String fullName, String streetAddress, String city, String state, String postalCode,
			String country) {
		super();
		
		this.fullName = fullName;
		this.streetAddress = streetAddress;
		this.city = city;
		this.state = state;
		this.postalCode = postalCode;
		this.country = country;
	}

	
	public Address() {
		super();
	}

	@Override
	public String toString() {
		return "Address [id=" + id + ", fullName=" + fullName + ", streetAddress=" + streetAddress + ", city=" + city
				+ ", state=" + state + ", postalCode=" + postalCode + ", country=" + country + "]";
	}
	
	

}
