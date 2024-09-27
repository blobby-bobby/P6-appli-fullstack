package mdd.api.services;

import mdd.api.entities.Topic;
import mdd.api.entities.UserInfo;
import mdd.api.exceptionhandler.BadCredentialsException;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.requests.auth.ModifyUserRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Set;

public interface UserInfoService extends UserDetailsService {

    /**
     * Retrieves the user corresponding to the username
     * @param username
     * @return
     * @throws EntityNotFoundException
     */
    @Override
    UserDetails loadUserByUsername(String username) throws EntityNotFoundException;

    /**
     * Register a new User
     * @param userInfo
     * @throws BadCredentialsException
     */
    void createUser(UserInfo userInfo) throws BadCredentialsException;

    /**
     * Get user by username
     * @param username
     * @throws EntityNotFoundException
     */
    UserInfo getUserByUsername(String username) throws EntityNotFoundException;

    /**
     * Get user by id
     * @param id
     * @throws EntityNotFoundException
     */
    UserInfo getUserById(Long id) throws EntityNotFoundException;

    /**
     * Update user's name, email or password
     * @param username
     * @param request
     * @throws BadCredentialsException
     */
    UserInfo modifyUser(String username, ModifyUserRequest request) throws BadCredentialsException;

    /**
     * Set the user's subscription
     * @param username
     * @param subscriptions
     * @return
     */
    UserInfo updateSubscriptions(String username, Set<Topic> subscriptions);

}
