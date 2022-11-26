import { CREATED } from 'http-status';
import { InvestorService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class InvestorController {
  static async create(req, res, next) {
    try {
      const { fullName, occupation, telephoneNumber, emailAddress, rates, profilePhotoUrl } =
        req.body;
      const newInvestor = await InvestorService.create(
        fullName,
        occupation,
        telephoneNumber,
        emailAddress,
        rates,
        profilePhotoUrl
      );
      res.locals.status = CREATED;
      res.locals.data = newInvestor;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const investorObject = await InvestorService.get(id);
      if (!investorObject) {
        throw new NotFound(`Investor with primary key ${id} not found`);
      }
      res.locals.data = investorObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allInvestors = await InvestorService.getAll(filters);
      res.locals.data = allInvestors;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, occupation, telephoneNumber, emailAddress, rates, profilePhotoUrl } =
        req.body;

      const updatedInvestor = await InvestorService.update(
        id,
        fullName,
        occupation,
        telephoneNumber,
        emailAddress,
        rates,
        profilePhotoUrl
      );

      res.locals.data = updatedInvestor;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, occupation, telephoneNumber, emailAddress, rates, profilePhotoUrl } =
        req.body;

      const updatedInvestor = await InvestorService.partialUpdate(
        id,
        fullName,
        occupation,
        telephoneNumber,
        emailAddress,
        rates,
        profilePhotoUrl
      );

      res.locals.data = updatedInvestor;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const investorDelete = await InvestorService.destroy(id);
      res.locals.data = investorDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { InvestorController };
