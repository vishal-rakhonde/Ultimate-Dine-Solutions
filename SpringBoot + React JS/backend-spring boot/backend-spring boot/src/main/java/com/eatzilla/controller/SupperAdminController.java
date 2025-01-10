package com.eatzilla.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eatzilla.model.User;
import com.eatzilla.service.UserService;

@RestController
public class SupperAdminController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/api/customers")
	public ResponseEntity<List<User>> getAllCustomers() {
		
		List<User> users =userService.findAllUsers();
		
		return new ResponseEntity<>(users,HttpStatus.ACCEPTED);

	}
	

}
