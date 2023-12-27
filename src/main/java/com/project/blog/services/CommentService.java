package com.project.blog.services;

import com.project.blog.converters.CommentConverter;
import com.project.blog.models.dtos.CommentDTO;
import com.project.blog.models.entities.CommentEntity;
import com.project.blog.repositories.CommentRepository;
import com.project.blog.repositories.PostRepository;
import com.project.blog.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentConverter commentConverter;

    @Autowired
    public CommentService(
            CommentRepository commentRepository,
            PostRepository postRepository,
            UserRepository userRepository,
            CommentConverter commentConverter
    ) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentConverter = commentConverter;
    }

    public void createComment(CommentDTO dto) throws Exception {
        if (!postRepository.existsById(dto.getPostId())) {
            throw new Exception("Post with id " + dto.getPostId() + " does not exist");
        }
        CommentEntity comment = commentConverter.toEntity(dto);
        commentRepository.save(comment);
    }

    public List<CommentDTO> getCommentsByPostId(Long postId) throws Exception {
        if (!postRepository.existsById(postId)) {
            throw new Exception("Post with id " + postId + " does not exist");
        }
        List<CommentEntity> comments = commentRepository.findCommentEntitiesByPostId(postId);
        return commentConverter.toDTOList(comments);
    }
}
