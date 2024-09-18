package mdd.api.mappers;

import mdd.api.dto.PostDto;
import mdd.api.entities.Post;
import mdd.api.services.UserInfoService;
import mdd.api.services.impl.TopicServiceImpl;
import mdd.api.services.impl.UserInfoServiceImpl;
import mdd.api.util.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "Spring")
public abstract class PostMapper implements EntityMapper<PostDto, Post> {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    TopicServiceImpl topicService;

    @Mappings({
            @Mapping(target = "author", expression = "java(this.userInfoService.getUserById(postDto.getAuthor_id()))"),
            @Mapping(target = "topic", expression = "java(this.topicService.getTopicById(postDto.getTopic_id()))")

    })
    public abstract Post toEntity(PostDto postDto);

    @Mappings({
            @Mapping(source = "post.author.id", target = "author_id"),
            @Mapping(source = "post.topic.id", target = "topic_id"),
            @Mapping(source = "post.author.name", target = "author_name"),
            @Mapping(source = "post.topic.name", target = "topic_name"),
    })
    public abstract PostDto toDto(Post post);
}
