package mdd.api.services;

import mdd.api.entities.Post;
import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;

import java.util.List;

public interface PostService {

    /**
     * Get post corresponding to the id
     * @param id
     * @return
     * @throws EntityNotFoundException
     */
    Post getPostById(final Long id) throws EntityNotFoundException;

    /**
     * Get all articles included in a list topic IDs
     * @param topics
     */
    List<Post> getPostsByTopics(final List<Topic> topics);

    /**
     * Create a post that will be displayed on feed if topic in user's subscriptions
     * @param post to be created
     */
    Post createPost(Post post);

}
