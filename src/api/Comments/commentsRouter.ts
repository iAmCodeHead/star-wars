import express from 'express';
import { controllerHandler } from '../../utils/controllerHandler';
import { CommentsController } from './commentsController';

const router = express.Router();
const call = controllerHandler;
const Comments = new CommentsController();

router.post('/:movieId/comment', call(Comments.makeComment, (req, _res, _next) => [req.body]));

router.get('/:movieId/comment', call(Comments.getAllCommentsByMovie, (req, _res, _next) => [req.params.movieId]));

export const commentsRouter = router;