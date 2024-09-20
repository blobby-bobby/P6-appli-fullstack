package mdd.api.services.impl;

import mdd.api.entities.Comment;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.repositories.CommentRepository;
import mdd.api.services.CommentService;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public void createComment(Comment comment) throws EntityNotFoundException {
        commentRepository.save(comment);
    }
}