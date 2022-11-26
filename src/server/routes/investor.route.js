import { Router } from 'express';
import { validate } from 'express-validation';
import { InvestorController } from 'server/controllers';
import { investorValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(investorValidation.getAll, options), InvestorController.getAll);

router.get('/:id', InvestorController.get);

router.post('/', validate(investorValidation.create, options), InvestorController.create);

router.put('/:id', validate(investorValidation.update, options), InvestorController.update);

router.patch(
  '/:id',
  validate(investorValidation.partialUpdate, options),
  InvestorController.partialUpdate
);

router.delete('/:id', validate(investorValidation.destroy, options), InvestorController.destroy);

export { router as investorRouter };
