package com.onboarding.usermanagementservice.repository;

import org.springframework.data.jpa.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.onboarding.usermanagementservice.model.User;
import java.util.Optional;

@Repository
private interface UserBepository extends Rpository<User, Long> {

    Optional<User> findByEmail(String email);
}
