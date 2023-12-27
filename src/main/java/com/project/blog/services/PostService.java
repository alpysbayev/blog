package com.project.blog.services;

import com.project.blog.converters.PostConverter;
import com.project.blog.models.dtos.PostDTO;
import com.project.blog.models.entities.PostEntity;
import com.project.blog.repositories.PostRepository;
import com.project.blog.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentService commentService;
    private final PostConverter postConverter;

    @Autowired
    public PostService(
            PostRepository postRepository,
            UserRepository userRepository,
            CommentService commentService,
            PostConverter postConverter
    ) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentService = commentService;
        this.postConverter = postConverter;
    }

    public void createPost(PostDTO dto) throws Exception {
        PostEntity postEntity = postConverter.toEntity(dto);
        postRepository.save(postEntity);
    }

    public List<PostDTO> getAllPosts() throws Exception {
        List<PostEntity> posts = postRepository.findAll();
        return postConverter.toDTOList(posts);
    }

    public PostDTO getPostById(Long id) throws Exception {
        PostEntity post = postRepository.findById(id).orElseThrow(() -> new Exception("Post not found"));
        return postConverter.toDTO(post);
    }

    public void updatePost(Long id, PostDTO dto) throws Exception {
        PostEntity post = postRepository.findById(id).orElseThrow(() -> new Exception("Post not found"));
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        postRepository.save(post);
    }

    public void deletePost(Long id) throws Exception {
        PostEntity post = postRepository.findById(id).orElseThrow(() -> new Exception("Post not found"));
        postRepository.delete(post);
    }
}
