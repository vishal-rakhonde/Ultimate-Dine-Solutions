package com.eatzilla.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eatzilla.Exception.UserException;
import com.eatzilla.config.JwtProvider;
import com.eatzilla.model.User;
import com.eatzilla.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;

	public UserServiceImplementation(UserRepository userRepository, JwtProvider jwtProvider,
			PasswordEncoder passwordEncoder)

	{

		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;

	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromJwtToken(jwt);

		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new UserException("user not exist with email " + email);
		}
//		System.out.println("email user "+user.get().getEmail());
		return user;
	}

	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public List<User> getPenddingRestaurantOwner() {

		return userRepository.getPenddingRestaurantOwners();
	}

	@Override
	public void updatePassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
	}

	@Override
	public User findUserByEmail(String username) throws UserException {

		User user = userRepository.findByEmail(username);

		if (user != null) {

			return user;
		}

		throw new UserException("user not exist with username " + username);
	}

}
