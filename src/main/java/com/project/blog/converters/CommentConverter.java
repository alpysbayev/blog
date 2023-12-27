package com.project.blog.converters;

import com.project.blog.models.dtos.CommentDTO;
import com.project.blog.models.entities.CommentEntity;
import com.project.blog.repositories.PostRepository;
import com.project.blog.repositories.UserRepository;
import com.project.blog.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentConverter implements Converter<CommentEntity, CommentDTO>{

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public CommentConverter(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    public CommentDTO toDTO(CommentEntity entity) {
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getId());
        dto.setContent(entity.getContent());
        dto.setAuthorUsername(entity.getAuthor().getUsername());
        dto.setCreatedAt(entity.getCreatedAt().toString());
        dto.setPostId(entity.getPost().getId());
        return dto;
    }

    @Override
    public CommentEntity toEntity(CommentDTO dto) {
        CommentEntity entity = new CommentEntity();
        entity.setAuthor(userRepository.findUserEntityByUsername(dto.getAuthorUsername()));
        entity.setPost(postRepository.getById(dto.getPostId()));
        entity.setContent(dto.getContent());
        return entity;
    }
}
