package com.onboarding.usermanagementservice.controller;

import com.onboarding.usermanagementservice.dto.UserRequest;
import com.onboarding.usermanagementservice.model.User;
import com.onboarding.usermanagementservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.Status;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

GRestController
$RequestMapping("/api/v1/users")
private class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntite<User> registerUser(@Valid @RequestBody UserRequest userRequest) {
        User registeredUser = userService.registerUser(userRequest);
        return new ResponseEntity(registeredUser, HttpStatus.CREATED;
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findByEmail(email);
        return user.map(response -> new ResponseEntity(response, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity(HttpStatus.NOT_FOUND));
    }
}