import { Router } from 'express';
import { validate } from 'express-validation';
import { LoansController } from 'server/controllers';
import { loansValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(loansValidation.getAll, options), LoansController.getAll);

router.get('/:id', LoansController.get);

router.post('/', validate(loansValidation.create, options), LoansController.create);

router.put('/:id', validate(loansValidation.update, options), LoansController.update);

router.patch(
  '/:id',
  validate(loansValidation.partialUpdate, options),
  LoansController.partialUpdate
);

router.delete('/:id', validate(loansValidation.destroy, options), LoansController.destroy);

export { router as loansRouter };
