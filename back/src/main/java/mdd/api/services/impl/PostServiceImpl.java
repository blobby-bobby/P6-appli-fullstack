package mdd.api.services.impl;

import mdd.api.entities.Post;
import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.repositories.PostRepository;
import mdd.api.repositories.TopicRepository;
import mdd.api.services.PostService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<Post> getPostsByTopics(final List<Topic> topics) {
        List<Post> posts = postRepository.findAll().stream()
                .filter(post -> topics.contains(post.getTopic()))
                .toList();

        return posts;
    };

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    };
}
