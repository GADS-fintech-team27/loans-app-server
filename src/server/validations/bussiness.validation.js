import { Joi } from 'express-validation';

const bussinessValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      businessName: Joi.string().max(255),
      loanAmount: Joi.number().integer(),
      description: Joi.string().max(255),
      physicalAddress: Joi.string().max(255),
      ownerName: Joi.string().max(255),
      ownerContact: Joi.string().max(255),
      businessType: Joi.string().max(255),
      collateral: Joi.string().max(255),
      bussinessPhotoUrl: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      businessName: Joi.string().max(255),
      loanAmount: Joi.number().integer(),
      description: Joi.string().max(255),
      physicalAddress: Joi.string().max(255),
      ownerName: Joi.string().max(255),
      ownerContact: Joi.string().max(255),
      businessType: Joi.string().max(255),
      collateral: Joi.string().max(255),
      bussinessPhotoUrl: Joi.string().max(255),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      businessName: Joi.string().max(255).required(),
      loanAmount: Joi.number().integer().required(),
      description: Joi.string().max(255).required(),
      physicalAddress: Joi.string().max(255).required(),
      ownerName: Joi.string().max(255).required(),
      ownerContact: Joi.string().max(255).required(),
      businessType: Joi.string().max(255).required(),
      collateral: Joi.string().max(255).required(),
      bussinessPhotoUrl: Joi.string().max(255).required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      businessName: Joi.string().max(255),
      loanAmount: Joi.number().integer(),
      description: Joi.string().max(255),
      physicalAddress: Joi.string().max(255),
      ownerName: Joi.string().max(255),
      ownerContact: Joi.string().max(255),
      businessType: Joi.string().max(255),
      collateral: Joi.string().max(255),
      bussinessPhotoUrl: Joi.string().max(255),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { bussinessValidation };
