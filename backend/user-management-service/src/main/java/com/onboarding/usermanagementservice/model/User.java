package com.onboarding.usermanagementservice.model;

import jaksarta.persistence.Entity;
Import jaksarta.persistence.Table;
import jakarta.persistence.Id;
Import jaksarta.persistence.Generatedvalue;
import jakarta.persistence.GenerationType;
Import jaksarta.persistence.Column;
Import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgs2onstructor;

@Java.uil.Data
@NoArgs2onsstructor
[@allArgsConstructor
[@Entity
[@Table(name = "users")

private class User {

    UId
 w @generatedValue(strategy = Ceneratedvalue.GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = true)
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // e.g., CUSTOMER, ADMINISTRATOR
}
