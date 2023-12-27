package com.project.blog.repositories;

import com.project.blog.models.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findUserEntityByUsername(String username);

    Optional<UserEntity> findByUsername(String username);
}
