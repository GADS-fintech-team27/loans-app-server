import { CREATED } from 'http-status';
import { LoansService, InvestorService, BussinessService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class LoansController {
  static async create(req, res, next) {
    try {
      const { amount, investor, bussiness } = req.body;
      if (investor !== null && typeof investor !== 'undefined') {
        const dbinvestor = await InvestorService.get(investor);
        if (!dbinvestor) {
          throw new NotFound(`Investor ${investor} not found`);
        }
      }
      if (bussiness !== null && typeof bussiness !== 'undefined') {
        const dbbussiness = await BussinessService.get(bussiness);
        if (!dbbussiness) {
          throw new NotFound(`Bussiness ${bussiness} not found`);
        }
      }
      const newLoans = await LoansService.create(amount, investor, bussiness);
      res.locals.status = CREATED;
      res.locals.data = newLoans;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const loansObject = await LoansService.get(id);
      if (!loansObject) {
        throw new NotFound(`Loans with primary key ${id} not found`);
      }
      res.locals.data = loansObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allLoanss = await LoansService.getAll(filters);
      res.locals.data = allLoanss;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { amount, investor, bussiness } = req.body;
      if (investor !== null && typeof investor !== 'undefined') {
        if (!(await InvestorService.get(investor))) {
          throw new NotFound(`Investor ${investor} not found`);
        }
      }
      if (bussiness !== null && typeof bussiness !== 'undefined') {
        if (!(await BussinessService.get(bussiness))) {
          throw new NotFound(`Bussiness ${bussiness} not found`);
        }
      }

      const updatedLoans = await LoansService.update(id, amount, investor, bussiness);

      res.locals.data = updatedLoans;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { amount, investor, bussiness } = req.body;
      if (investor !== null && typeof investor !== 'undefined') {
        if (!(await InvestorService.get(investor))) {
          throw new NotFound(`Investor ${investor} not found`);
        }
      }
      if (bussiness !== null && typeof bussiness !== 'undefined') {
        if (!(await BussinessService.get(bussiness))) {
          throw new NotFound(`Bussiness ${bussiness} not found`);
        }
      }

      const updatedLoans = await LoansService.partialUpdate(id, amount, investor, bussiness);

      res.locals.data = updatedLoans;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const loansDelete = await LoansService.destroy(id);
      res.locals.data = loansDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { LoansController };
