package mdd.api.services.impl;

import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.repositories.TopicRepository;
import mdd.api.services.TopicService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) { this.topicRepository = topicRepository;}

    @Override
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    @Override
    public Topic getTopicById(final Long id) throws EntityNotFoundException {
        return topicRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException(Topic.class,"id",id.toString()));
    }
}
