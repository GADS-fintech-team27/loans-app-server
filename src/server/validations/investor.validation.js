import { Joi } from 'express-validation';

const investorValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      fullName: Joi.string().max(255),
      occupation: Joi.string().max(255),
      telephoneNumber: Joi.string().max(255),
      emailAddress: Joi.string().max(255),
      rates: Joi.number().integer(),
      profilePhotoUrl: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      fullName: Joi.string().max(255),
      occupation: Joi.string().max(255),
      telephoneNumber: Joi.string().max(255),
      emailAddress: Joi.string().max(255),
      rates: Joi.number().integer(),
      profilePhotoUrl: Joi.string().max(255),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      fullName: Joi.string().max(255).required(),
      occupation: Joi.string().max(255).required(),
      telephoneNumber: Joi.string().max(255).required(),
      emailAddress: Joi.string().max(255).required(),
      rates: Joi.number().integer().required(),
      profilePhotoUrl: Joi.string().max(255).required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      fullName: Joi.string().max(255),
      occupation: Joi.string().max(255),
      telephoneNumber: Joi.string().max(255),
      emailAddress: Joi.string().max(255),
      rates: Joi.number().integer(),
      profilePhotoUrl: Joi.string().max(255),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { investorValidation };
