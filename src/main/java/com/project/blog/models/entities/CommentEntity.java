package com.project.blog.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "comments")
public class CommentEntity extends BaseEntity {

    private String content;

    @ManyToOne
    @JoinColumn(name = "author", nullable = false, referencedColumnName = "username")
    private UserEntity author;

    @ManyToOne
    @JoinColumn(name = "post", nullable = false, referencedColumnName = "id")
    private PostEntity post;
}
