package mdd.api.services;

import mdd.api.entities.Post;
import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;

import java.util.List;

public interface PostService {
    Post getPostById(final Long id) throws EntityNotFoundException;

    /**
     * Get all articles corresponding to MANY topic IDs
     * @param topics
     * @return
     */
    List<Post> getPostsByTopics(final List<Topic> topics);

    Post createPost(Post post);

}
