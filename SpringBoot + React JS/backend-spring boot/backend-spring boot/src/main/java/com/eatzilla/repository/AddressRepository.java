package com.eatzilla.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eatzilla.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
