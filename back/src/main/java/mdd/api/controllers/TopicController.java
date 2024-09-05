package mdd.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.services.TopicService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/topic")
public class TopicController {
    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
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
}
