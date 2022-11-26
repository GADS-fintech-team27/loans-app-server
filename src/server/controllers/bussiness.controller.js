import { CREATED } from 'http-status';
import { BussinessService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class BussinessController {
  static async create(req, res, next) {
    try {
      const {
        businessName,
        loanAmount,
        description,
        physicalAddress,
        ownerName,
        ownerContact,
        businessType,
        collateral,
        bussinessPhotoUrl,
      } = req.body;
      const newBussiness = await BussinessService.create(
        businessName,
        loanAmount,
        description,
        physicalAddress,
        ownerName,
        ownerContact,
        businessType,
        collateral,
        bussinessPhotoUrl
      );
      res.locals.status = CREATED;
      res.locals.data = newBussiness;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const bussinessObject = await BussinessService.get(id);
      if (!bussinessObject) {
        throw new NotFound(`Bussiness with primary key ${id} not found`);
      }
      res.locals.data = bussinessObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allBussinesss = await BussinessService.getAll(filters);
      res.locals.data = allBussinesss;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        businessName,
        loanAmount,
        description,
        physicalAddress,
        ownerName,
        ownerContact,
        businessType,
        collateral,
        bussinessPhotoUrl,
      } = req.body;

      const updatedBussiness = await BussinessService.update(
        id,
        businessName,
        loanAmount,
        description,
        physicalAddress,
        ownerName,
        ownerContact,
        businessType,
        collateral,
        bussinessPhotoUrl
      );

      res.locals.data = updatedBussiness;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        businessName,
        loanAmount,
        description,
        physicalAddress,
        ownerName,
        ownerContact,
        businessType,
        collateral,
        bussinessPhotoUrl,
      } = req.body;

      const updatedBussiness = await BussinessService.partialUpdate(
        id,
        businessName,
        loanAmount,
        description,
        physicalAddress,
        ownerName,
        ownerContact,
        businessType,
        collateral,
        bussinessPhotoUrl
      );

      res.locals.data = updatedBussiness;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const bussinessDelete = await BussinessService.destroy(id);
      res.locals.data = bussinessDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { BussinessController };
