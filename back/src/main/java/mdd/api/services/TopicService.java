package mdd.api.services;

import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;

import java.util.List;

public interface TopicService {

    Topic getTopicById(final Long id) throws EntityNotFoundException;

    List<Topic> getAllTopics();

    
}
