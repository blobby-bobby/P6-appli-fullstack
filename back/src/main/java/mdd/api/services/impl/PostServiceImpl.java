package mdd.api.services.impl;

import mdd.api.entities.Post;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.repositories.PostRepository;
import mdd.api.services.PostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Post getPostById(final Long id) throws EntityNotFoundException {
        return postRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException(Post.class,"id",id.toString()));
    }

    @Override
    public List<Post> getPostsByTopicId(final Long id) throws EntityNotFoundException {
        // TODO;
        return null;
    }

    @Override
    public List<Post> getPostsByTopicIds(final List<Long> ids) {
        // TODO;
        return null;
    };

    @Override
    public Post createPost(Post post) {
        // TODO
        return postRepository.save(post);
    };
}
