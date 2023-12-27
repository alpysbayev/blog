package com.project.blog.models.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    @JsonProperty("author_username")
    private String authorUsername;
    @JsonProperty("created_at")
    private String createdAt;
    private List<CommentDTO> comments;
}
