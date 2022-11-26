import { Loans } from 'data/models';
import { NotFound } from 'server/utils/errors';

class LoansRepository {
  static async create(amount, investor, bussiness) {
    const createdLoans = await Loans.create({
      amount,
      investor,
      bussiness,
    });

    return createdLoans;
  }

  static get(id) {
    return Loans.findByPk(id, { include: [] });
  }

  static getAll(filters) {
    return Loans.findAll({
      where: filters,
      include: [],
    });
  }

  static async update(id, amount, investor, bussiness) {
    return this.partialUpdate({
      id,
      amount,
      investor,
      bussiness,
    });
  }

  static async partialUpdate({ id, amount, investor, bussiness }) {
    const foundLoans = await Loans.findByPk(id);
    if (!foundLoans) throw new NotFound(`Loans with primary key ${id} not found`);
    if (amount !== undefined) foundLoans.amount = amount;
    if (investor !== undefined) foundLoans.investor = investor;
    if (bussiness !== undefined) foundLoans.bussiness = bussiness;
    await foundLoans.save();
    return foundLoans.reload();
  }

  static async destroy(id) {
    const foundLoans = await Loans.findByPk(id);
    if (!foundLoans) throw new NotFound(`Loans with primary key ${id} not found`);
    await foundLoans.destroy();
    return foundLoans;
  }
}

export { LoansRepository };
