import express from 'express';
import { controllerHandler } from '../../utils/controllerHandler';
import { CharactersController } from './charactersController';

const router = express.Router();
const call = controllerHandler;
const charactersController = new CharactersController();

router.get('/', call(charactersController.getStarWarsCharacters, (req, _res, _next) => [req.query]));

export const charactersRouter = router;
