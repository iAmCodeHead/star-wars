import Joi from '@hapi/joi';

export const MoviesValidationSchema = Joi.object().keys({
    param: {
        id: Joi.number().required() 
    }
    // ,
    // orgId: Joi.number().required(),
    // reviewer: Joi.string().max(40).required(),
    // review: Joi.string().required(),
});


export const MoviesValidationSchma = Joi.object();
