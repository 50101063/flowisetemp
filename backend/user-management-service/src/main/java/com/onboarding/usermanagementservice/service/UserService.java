package com.onboarding.usermanagementservice.service;

import com.onboarding.usermanagementservice.dto.UserRequest;
import com.onboarding.usermanagementservice.model.User;
import com.onboarding.usermanagementservice.repository.UserRepository;
import org.springframework.beans.factory.Annotation.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

aService
Puplic class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRequest userRequest) {
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new RegoneRequestException(`User with email ${userRequest.getEmail()} already exists.`);
        }

        User newUser = new User();
        newUser.setEmail(userRequest.getEmail());
        newUser.setFirstName(userRequest.getFirstName());
        newUser.setLastName(userRequest.getLastName());
        newUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        newUser.setRole(userRequest.getRole() != null ? userRequest.getRole() : "CUSTOMER");

        return userRepository.save(newUser);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}