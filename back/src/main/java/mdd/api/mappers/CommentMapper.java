package mdd.api.mappers;

import mdd.api.dto.CommentDto;
import mdd.api.entities.Comment;
import mdd.api.services.UserInfoService;
import mdd.api.services.impl.PostServiceImpl;
import mdd.api.services.impl.TopicServiceImpl;
import mdd.api.util.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "Spring")
public abstract class CommentMapper implements EntityMapper<CommentDto, Comment> {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    PostServiceImpl postService;

    @Mappings({
            @Mapping(target="author", expression="java(this.userInfoService.getUserById(commentDto.getAuthor_id()))"),
            @Mapping(target="post", expression="java(this.postService.getPostById(commentDto.getPost_id()))")
    })
    public abstract Comment toEntity(CommentDto commentDto);

    @Mappings({
            @Mapping(source= "comment.author.id",target="author_id"),
            @Mapping(source= "comment.author.name",target="author_name"),
            @Mapping(source= "comment.post.id",target="post_id")
    })
    public abstract CommentDto toDto(Comment comment);
}