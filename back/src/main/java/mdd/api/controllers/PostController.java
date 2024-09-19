package mdd.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import mdd.api.dto.PostDto;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.mappers.PostMapper;
import mdd.api.security.JwtService;
import mdd.api.services.PostService;
import mdd.api.services.TopicService;
import mdd.api.services.UserInfoService;
import mdd.api.services.impl.PostServiceImpl;
import mdd.api.services.impl.TopicServiceImpl;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;


@RestController
public class PostController {
    private final PostService postService;
    private final TopicService topicService;
    private final UserInfoService userInfoService;
    private final PostMapper postMapper;
    private final JwtService jwtService;

    public PostController(
            PostServiceImpl postService,
            TopicServiceImpl topicService,
            UserInfoService userInfoService,
            PostMapper postMapper,
            JwtService jwtService
    ) {
        this.postService = postService;
        this.topicService = topicService;
        this.userInfoService = userInfoService;
        this.postMapper = postMapper;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Get Post with its id",responses={
            @ApiResponse(responseCode="200", description = "Selected post displayed"),
            @ApiResponse(responseCode="400", description = "Post's Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @GetMapping("/{id}")
    @Secured("ROLE_USER")
    public PostDto getPostById(@PathVariable("id") final long id) throws EntityNotFoundException {
        return postMapper.toDto(postService.getPostById(id));
    }
}
