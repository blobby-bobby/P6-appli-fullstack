package mdd.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import mdd.api.entities.Topic;
import mdd.api.entities.UserInfo;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.requests.auth.ModifyUserRequest;
import mdd.api.security.JwtService;
import mdd.api.services.TopicService;
import mdd.api.services.UserInfoService;
import mdd.api.services.impl.TopicServiceImpl;
import mdd.api.services.impl.UserInfoServiceImpl;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/topic")
public class TopicController {
    private final TopicService topicService;
     private final UserInfoService userInfoService;
     private final JwtService jwtService;

    public TopicController(
            TopicServiceImpl topicService,
            @Qualifier("userInfoServiceImpl")
            UserInfoServiceImpl userInfoService,
            JwtService jwtService
            ) {
        this.topicService = topicService;
         this.userInfoService = userInfoService;
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
}
