package mdd.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import mdd.api.dto.CommentDto;
import mdd.api.dto.PostDto;
import mdd.api.entities.Comment;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.mappers.CommentMapper;
import mdd.api.mappers.PostMapper;
import mdd.api.security.JwtService;
import mdd.api.services.CommentService;
import mdd.api.services.PostService;
import mdd.api.services.UserInfoService;
import mdd.api.services.impl.CommentServiceImpl;
import mdd.api.services.impl.PostServiceImpl;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class PostController {
    private final PostService postService;
    private final UserInfoService userInfoService;
    private final PostMapper postMapper;
    private final JwtService jwtService;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public PostController(
            PostServiceImpl postService,
            UserInfoService userInfoService,
            PostMapper postMapper,
            CommentServiceImpl commentService,
            JwtService jwtService,
            CommentMapper commentMapper
    ) {
        this.postService = postService;
        this.userInfoService = userInfoService;
        this.postMapper = postMapper;
        this.commentService = commentService;
        this.jwtService = jwtService;
        this.commentMapper = commentMapper;
    }

    @Operation(summary = "Get Post with its id",responses={
            @ApiResponse(responseCode="200", description = "Selected post displayed"),
            @ApiResponse(responseCode="400", description = "Post's Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @GetMapping("/posts/{id}")
    @Secured("ROLE_USER")
    public PostDto getPostById(@PathVariable("id") final long id) throws EntityNotFoundException {
        return postMapper.toDto(postService.getPostById(id));
    }

    @Operation(summary = "Create new comment for corresponding post",responses={
            @ApiResponse(responseCode="200", description = "Comments successfully created"),
            @ApiResponse(responseCode="400", description = "Post Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })

    @PostMapping("/{id}/comments")
    @Secured("ROLE_USER")
    public Map<String,String> createComment(
            @PathVariable("id") final long id,
            @RequestHeader(value="Authorization",required=false) String jwt,
            @RequestBody @NotBlank @Size(max=500) String content
    ) throws EntityNotFoundException {
        String username = jwtService.extractUsername(jwt.substring(7));
        Comment comment=Comment.builder()
                .content(content)
                .author(userInfoService.getUserByUsername(username))
                .post(postService.getPostById(id))
                .build();
        commentService.createComment(comment);
        Map<String,String> map=new HashMap<>();
        map.put("response","Your comment has been posted");
        return map;
    }

    @Operation(summary = "Shows all comments corresponding to a post",responses={
            @ApiResponse(responseCode="200", description = "Comments successfully shown"),
            @ApiResponse(responseCode="400", description = "Post Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @GetMapping("/{id}/comments")
    @Secured("ROLE_USER")
    public List<CommentDto> getCommentsForPost(@PathVariable("id") final long id) throws EntityNotFoundException {
        return commentMapper.toDto(commentService.getCommentsForPost(id));
    }
}
