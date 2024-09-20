package mdd.api.services;

import mdd.api.entities.Comment;
import mdd.api.exceptionhandler.EntityNotFoundException;

import java.util.List;

public interface CommentService {
    /**
     * Tries to create and save a comment
     * @param comment Comment to be created
     * @throws EntityNotFoundException post id not found
     */
    void createComment(Comment comment) throws EntityNotFoundException;

    List<Comment> getCommentsForPost(final Long id);
}
