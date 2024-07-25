package mdd.api.services;

import mdd.api.entities.UserInfo;
import mdd.api.exceptionhandler.BadCredentialsException;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.requests.auth.ModifyUserRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserInfoService extends UserDetailsService {
    @Override
    UserDetails loadUserByUsername(String username) throws EntityNotFoundException;

    void createUser(UserInfo userInfo) throws BadCredentialsException;

    UserInfo getUserByUsername(String username) throws EntityNotFoundException;

    UserInfo getUserById(Long id) throws EntityNotFoundException;

    UserInfo modifyUser(String username, ModifyUserRequest request) throws BadCredentialsException;
}
