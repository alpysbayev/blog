package com.project.blog.repositories;

import com.project.blog.models.entities.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findCommentEntitiesByPostId(Long postId);
}
