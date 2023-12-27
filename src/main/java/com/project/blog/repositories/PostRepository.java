package com.project.blog.repositories;

import com.project.blog.models.entities.PostEntity;
import com.project.blog.models.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    List<PostEntity> findPostEntitiesByAuthor(UserEntity author);
}
