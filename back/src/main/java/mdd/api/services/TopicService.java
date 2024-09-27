package mdd.api.services;

import mdd.api.entities.Topic;
import mdd.api.exceptionhandler.EntityNotFoundException;

import java.util.List;

public interface TopicService {

    /** Get topic corresponding to the id
     * @param id
     * @return topic
     * @throws EntityNotFoundException
     */
    Topic getTopicById(final Long id) throws EntityNotFoundException;

    /** Get all the topics to be displayed in the topics page
     * @return List of all Topics
     */
    List<Topic> getAllTopics();

    
}
