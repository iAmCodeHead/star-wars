import Joi from '@hapi/joi';

export const CommentsValidationSchema = {
    makeComment: Joi.object().keys({
        name: Joi.string(),
        body: Joi.string().max(500).required(),
    })
}
