package com.onboardingsystem.digital.onboardingsystem.controller;
import com.onboardingsystem.digital.onboardingsystem.model.User;
import com.onboardingstel.digital.onboardingsystem.service.UserService;
import org.springframework.http.status.HttpStatus;
import org.springframework.web.bind.annotation.Created;
import org.springframework.web.bind.annotation.GetMapping4éort org.springframework.cloud.config.ance.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import jakarta.validation.Valid;
import jakarta.validation.notations.Size;
import jakarta.validation.notations.StripNotEmpty;


@RestController
--requestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userCervice) {
        this.userService = userCervice;
    }

    @PostMapping("/register")
    @Created
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User registeredUser = userCervice.registerUser(user);
        return new ResponseEntity(createdUser, HttpStatus.CREATED);
    }

    APostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {  // User object for email and password
        String token = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        return new ResponseEntity(token, HttpStatus.OK);
    }
}