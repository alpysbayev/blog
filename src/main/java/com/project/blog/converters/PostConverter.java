package com.project.blog.converters;

import com.project.blog.models.dtos.PostDTO;
import com.project.blog.models.entities.PostEntity;
import com.project.blog.repositories.UserRepository;
import com.project.blog.services.CommentService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostConverter implements Converter<PostEntity, PostDTO>{

    private final CommentService commentService;
    private final UserRepository userRepository;

    @Autowired
    public PostConverter(CommentService commentService, UserRepository userRepository) {
        this.commentService = commentService;
        this.userRepository = userRepository;
    }

    @SneakyThrows
    @Override
    public PostDTO toDTO(PostEntity entity) {
        PostDTO dto = new PostDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setAuthorUsername(entity.getAuthor().getUsername());
        dto.setCreatedAt(entity.getCreatedAt().toString());
        dto.setComments(commentService.getCommentsByPostId(entity.getId()));
        return dto;
    }

    @Override
    public PostEntity toEntity(PostDTO dto) {
        PostEntity entity = new PostEntity();
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setAuthor(userRepository.findUserEntityByUsername(dto.getAuthorUsername()));
        return entity;
    }
}
