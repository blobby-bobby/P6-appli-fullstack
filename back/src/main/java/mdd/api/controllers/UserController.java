package mdd.api.controllers;

import mdd.api.dto.UserDto;
import mdd.api.entities.Topic;
import mdd.api.entities.UserInfo;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.services.UserInfoService;
import mdd.api.mappers.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserInfoService service;
    private final UserMapper userMapper;

    public UserController(UserInfoService service, UserMapper userMapper) {
        this.service = service;
        this.userMapper = userMapper;
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
}
