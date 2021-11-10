import express from 'express';
import { controllerHandler } from '../../utils/controllerHandler';
import { CommentsController } from '../Comments/commentsController';
import { CommentsValidationSchema } from '../Comments/commentsValidation';
import { MoviesController } from './moviesController';
import { validation } from '../../middlewares';

const router = express.Router();
const call = controllerHandler;
const moviesController = new MoviesController();
const commentsController = new CommentsController();

router.get('/', call(moviesController.getAllStarWarsMovies, (req, _res, _next) => []));

router.get('/:id', call(moviesController.getAStarWarsMovie, (req, _res, _next) => [req.params.id]));

router.post('/:id/comment', validation(CommentsValidationSchema.makeComment), call(commentsController.makeComment, (req, _res, _next) => [req, req.params.id]));

router.get('/:id/comment', call(commentsController.getAllCommentsByMovie, (req, _res, _next) => [req.params.id]));

export const moviesRouter = router;