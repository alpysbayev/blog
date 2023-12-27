package com.project.blog.converters;

import com.project.blog.models.dtos.UserDTO;
import com.project.blog.models.entities.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserConverter implements Converter<UserEntity, UserDTO>{
    @Override
    public UserDTO toDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setUsername(entity.getUsername());
        dto.setFirstname(entity.getFirstname());
        dto.setLastname(entity.getLastname());
        return dto;
    }

    @Override
    public UserEntity toEntity(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        return entity;
    }
}
