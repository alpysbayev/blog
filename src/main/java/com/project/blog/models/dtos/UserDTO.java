package com.project.blog.models.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String password;
    @JsonProperty("confirm_password")
    private String confirmPassword;
    private String firstname;
    private String lastname;
}
