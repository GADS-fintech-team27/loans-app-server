import { Investor } from 'data/models';
import { NotFound } from 'server/utils/errors';

class InvestorRepository {
  static async create(fullName, occupation, telephoneNumber, emailAddress, rates, profilePhotoUrl) {
    const createdInvestor = await Investor.create({
      fullName,
      occupation,
      telephoneNumber,
      emailAddress,
      rates,
      profilePhotoUrl,
    });

    return createdInvestor;
  }

  static get(id) {
    return Investor.findByPk(id, { include: ['loanss'] });
  }

  static getAll(filters) {
    return Investor.findAll({
      where: filters,
      include: ['loanss'],
    });
  }

  static async update(
    id,
    fullName,
    occupation,
    telephoneNumber,
    emailAddress,
    rates,
    profilePhotoUrl
  ) {
    return this.partialUpdate({
      id,
      fullName,
      occupation,
      telephoneNumber,
      emailAddress,
      rates,
      profilePhotoUrl,
    });
  }

  static async partialUpdate({
    id,
    fullName,
    occupation,
    telephoneNumber,
    emailAddress,
    rates,
    profilePhotoUrl,
  }) {
    const foundInvestor = await Investor.findByPk(id);
    if (!foundInvestor) throw new NotFound(`Investor with primary key ${id} not found`);
    if (fullName !== undefined) foundInvestor.fullName = fullName;
    if (occupation !== undefined) foundInvestor.occupation = occupation;
    if (telephoneNumber !== undefined) foundInvestor.telephoneNumber = telephoneNumber;
    if (emailAddress !== undefined) foundInvestor.emailAddress = emailAddress;
    if (rates !== undefined) foundInvestor.rates = rates;
    if (profilePhotoUrl !== undefined) foundInvestor.profilePhotoUrl = profilePhotoUrl;
    await foundInvestor.save();
    return foundInvestor.reload();
  }

  static async destroy(id) {
    const foundInvestor = await Investor.findByPk(id);
    if (!foundInvestor) throw new NotFound(`Investor with primary key ${id} not found`);
    await foundInvestor.destroy();
    return foundInvestor;
  }
}

export { InvestorRepository };
