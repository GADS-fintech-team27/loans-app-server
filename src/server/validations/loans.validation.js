import { Joi } from 'express-validation';

const loansValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      amount: Joi.number().integer(),
    }),
  },
  create: {
    body: Joi.object({
      investor: Joi.number().integer().required(),
      bussiness: Joi.number().integer().required(),
      amount: Joi.number().integer(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      amount: Joi.number().integer().required(),
      investor: Joi.number().integer().required(),
      bussiness: Joi.number().integer().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      amount: Joi.number().integer(),
      investor: Joi.number().integer(),
      bussiness: Joi.number().integer(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { loansValidation };
