package com.project.blog.models.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    @JsonProperty("post_id")
    private Long postId;
    private String content;
    @JsonProperty("author_username")
    private String authorUsername;
    @JsonProperty("created_at")
    private String createdAt;
}
