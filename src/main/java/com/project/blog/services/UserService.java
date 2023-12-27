package com.project.blog.services;

import com.project.blog.configs.JwtService;
import com.project.blog.converters.UserConverter;
import com.project.blog.models.dtos.JwtDTO;
import com.project.blog.models.dtos.UserDTO;
import com.project.blog.models.entities.UserEntity;
import com.project.blog.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserConverter userConverter;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public JwtDTO register(UserDTO dto) throws Exception {
        if (userRepository.findUserEntityByUsername(dto.getUsername()) != null) {
            throw new Exception("Username already exists");
        }
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new Exception("Passwords do not match");
        }
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        UserEntity userEntity = userConverter.toEntity(dto);
        userRepository.save(userEntity);

        var jwt = jwtService.generateToken(userEntity);
        return JwtDTO.builder().jwt(jwt).build();
    }

    public JwtDTO login(UserDTO dto) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        UserEntity userEntity = userRepository.findUserEntityByUsername(dto.getUsername());
        var jwt = jwtService.generateToken(userEntity);
        return JwtDTO.builder().jwt(jwt).build();
    }
}
