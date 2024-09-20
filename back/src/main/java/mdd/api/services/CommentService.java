package mdd.api.services;

import mdd.api.entities.Comment;
import mdd.api.exceptionhandler.EntityNotFoundException;

public interface CommentService {
    /**
     * Tries to create and save a comment
     * @param comment Comment to be created
     * @throws EntityNotFoundException post id not found
     */
    void createComment(Comment comment) throws EntityNotFoundException;
}
