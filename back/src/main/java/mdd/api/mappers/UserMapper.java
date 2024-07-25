package mdd.api.mappers;

import mdd.api.dto.UserDto;
import mdd.api.entities.UserInfo;
import mdd.api.util.EntityMapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<UserDto, UserInfo> {
}
