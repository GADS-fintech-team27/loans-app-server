import { Router } from 'express';
import { validate } from 'express-validation';
import { BussinessController } from 'server/controllers';
import { bussinessValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(bussinessValidation.getAll, options), BussinessController.getAll);

router.get('/:id', BussinessController.get);

router.post('/', validate(bussinessValidation.create, options), BussinessController.create);

router.put('/:id', validate(bussinessValidation.update, options), BussinessController.update);

router.patch(
  '/:id',
  validate(bussinessValidation.partialUpdate, options),
  BussinessController.partialUpdate
);

router.delete('/:id', validate(bussinessValidation.destroy, options), BussinessController.destroy);

export { router as bussinessRouter };
