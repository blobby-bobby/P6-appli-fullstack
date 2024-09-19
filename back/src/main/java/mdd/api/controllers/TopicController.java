package mdd.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import mdd.api.dto.PostDto;
import mdd.api.entities.Post;
import mdd.api.entities.Topic;
import mdd.api.entities.UserInfo;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.security.JwtService;
import mdd.api.services.PostService;
import mdd.api.services.TopicService;
import mdd.api.services.UserInfoService;
import mdd.api.services.impl.PostServiceImpl;
import mdd.api.services.impl.TopicServiceImpl;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/topic")
public class TopicController {
    private final TopicService topicService;
    private final UserInfoService userInfoService;
    private final JwtService jwtService;
    private final PostService postService;

    public TopicController(
            TopicServiceImpl topicService,
            UserInfoService userInfoService,
            PostServiceImpl postService,
            JwtService jwtService
            ) {
         this.topicService = topicService;
         this.userInfoService = userInfoService;
         this.postService = postService;
         this.jwtService = jwtService;
    }

    @GetMapping("")
    @Secured("ROLE_USER")
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }


    @Operation(summary = "get topics",responses={
            @ApiResponse(responseCode="200", description = "The list of topics is available"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @GetMapping("/{id}")
    @Secured("ROLE_USER")
    public Topic getTopicById(@PathVariable("id") final long id) throws EntityNotFoundException {
        return topicService.getTopicById(id);
    }

    @Operation(summary = "Subscribe the user to requested topic",responses={
            @ApiResponse(responseCode="200", description = "Successfully subscribed to topic"),
            @ApiResponse(responseCode="400", description = "Topic Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @PostMapping("/{id}/subscribe")
    @Secured("ROLE_USER")
    public String subscribeTopic(
            @PathVariable("id") final long id,
            @RequestHeader(value="Authorization",required=false) String jwt
    ) throws EntityNotFoundException {
        // Extract the username from the JWT
        String username = jwtService.extractUsername(jwt.substring(7));

        // Get the user's information
        UserInfo user = userInfoService.getUserByUsername(username);

        // Get the user subscriptions
        Set<Topic> userSubscriptions = user.getSubscriptions();

        // Get the topic by ID
        Topic topicId = topicService.getTopicById(id);

        if (userSubscriptions.add(topicId)) {
            // Update the user's information
            userInfoService.updateSubscriptions(username, userSubscriptions);

            return "Successfully subscribed";
        } else {
            return "User already subscribed to this topic";
        }
    }

    @Operation(summary = "Unsubscribe the user to requested topic",responses={
            @ApiResponse(responseCode="200", description = "Successfully subscribed to topic"),
            @ApiResponse(responseCode="400", description = "Topic Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @DeleteMapping("/{id}/subscribe")
    @Secured("ROLE_USER")
    public String unsubscribeTopic(
            @PathVariable("id") final long id,
            @RequestHeader(value="Authorization",required=false) String jwt
    ) throws EntityNotFoundException {
        // Extract the username from the JWT
        String username = jwtService.extractUsername(jwt.substring(7));

        // Get the user's information
        UserInfo user = userInfoService.getUserByUsername(username);

        // Get the user subscriptions
        Set<Topic> userSubscriptions = user.getSubscriptions();

        // Get the topic by ID
        Topic topicId = topicService.getTopicById(id);

        if (userSubscriptions.remove(topicId)) {
            // Update the user's information
            userInfoService.updateSubscriptions(username, userSubscriptions);

            return "Successfully unsubscribed";
        } else {
            return "User wasn't subscribed to this topic";
        }
    }

    @Operation(summary = "Create new post for the selected topic",responses={
            @ApiResponse(responseCode="200", description = "Post successfully created"),
            @ApiResponse(responseCode="400", description = "Topic Id doesn't exist"),
            @ApiResponse(responseCode="403", description = "Access unauthorized")
    })
    @PostMapping("/{id}/post")
    @Secured("ROLE_USER")
    public Map<String,String> createPost(
            @PathVariable("id") final long id,
            @RequestHeader(value="Authorization",required=false) String jwt,
            @RequestBody PostDto postDto
    ) throws EntityNotFoundException {
        String username=jwtService.extractUsername(jwt.substring(7));
        Post post=Post.builder()
                .content(postDto.getContent())
                .title(postDto.getTitle())
                .author(userInfoService.getUserByUsername(username))
                .topic(topicService.getTopicById(id))
                .build();
        postService.createPost(post);
        Map<String,String> map=new HashMap<>();
        map.put("response","New post successfully created");
        return map;
    }
}
