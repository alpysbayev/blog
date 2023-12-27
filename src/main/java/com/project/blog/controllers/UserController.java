package com.project.blog.controllers;

import com.project.blog.converters.UserConverter;
import com.project.blog.models.dtos.UserDTO;
import com.project.blog.models.entities.UserEntity;
import com.project.blog.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserConverter userConverter;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            @AuthenticationPrincipal UserEntity userEntity
    ) {
        try {
            UserDTO dto = userConverter.toDTO(userEntity);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
