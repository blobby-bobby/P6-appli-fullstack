package mdd.api.services.impl;

import mdd.api.entities.Comment;
import mdd.api.exceptionhandler.EntityNotFoundException;
import mdd.api.repositories.CommentRepository;
import mdd.api.services.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<Comment> getCommentsForPost(final Long id) {
        return commentRepository.findByPostId(id);
    }
}