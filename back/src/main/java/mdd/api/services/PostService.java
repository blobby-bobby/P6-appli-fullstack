package mdd.api.services;

import mdd.api.entities.Post;
import mdd.api.exceptionhandler.EntityNotFoundException;

import java.util.List;

public interface PostService {
    Post getPostById(final Long id) throws EntityNotFoundException;

    /**
     * Get all articles corresponding to ONE topic ID
     * @param id
     * @return
     */
    List<Post> getPostsByTopicId(final Long id);

    /**
     * Get all articles corresponding to MANY topic IDs
     * @param ids
     * @return
     */
    List<Post> getPostsByTopicIds(final List<Long> ids);

    Post createPost(Post post);

}
