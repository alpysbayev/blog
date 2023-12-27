package com.project.blog.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "posts")
public class PostEntity extends BaseEntity {

    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "author", nullable = false, referencedColumnName = "username")
    private UserEntity author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<CommentEntity> comments;
}
