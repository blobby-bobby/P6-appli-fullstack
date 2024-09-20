package mdd.api.controllers;

import mdd.api.dto.PostDto;
import mdd.api.dto.UserDto;
import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.mappers.PostMapper;
import mdd.api.services.PostService;
import mdd.api.services.UserInfoService;
import mdd.api.mappers.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import mdd.api.services.impl.PostServiceImpl;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserInfoService service;
    private final UserMapper userMapper;
    private final PostMapper postMapper;
    private final PostService postService;

    public UserController(UserInfoService service, UserMapper userMapper, PostMapper postMapper, PostServiceImpl postService) {
        this.service = service;
        this.userMapper = userMapper;
        this.postMapper = postMapper;
        this.postService = postService;
    }

    @Operation(summary = "gets personal data from user by id",responses={
            @ApiResponse(responseCode="200", description = "Personal data is displayed"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @GetMapping("/{id}")
    @Secured("ROLE_USER")
    public UserDto getUserById(@PathVariable("id") final long id) throws EntityNotFoundException {
        return userMapper.toDto(service.getUserById(id));
    }

    @Operation(summary = "get all posts to which user has subscribed",responses={
            @ApiResponse(responseCode="200", description = "Your posts are displayed"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @GetMapping("/{id}/posts")
    @Secured("ROLE_USER")
    public List<PostDto> getPostsByUserSubscriptions(@PathVariable("id") final long id) throws EntityNotFoundException {
        List<Topic> topics = new ArrayList<Topic>(service.getUserById(id).getSubscriptions());
        return postMapper.toDto(postService.getPostsByTopics(topics));
    }
}
