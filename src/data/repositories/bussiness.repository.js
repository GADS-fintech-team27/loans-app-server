import { Bussiness } from 'data/models';
import { NotFound } from 'server/utils/errors';

class BussinessRepository {
  static async create(
    businessName,
    loanAmount,
    description,
    physicalAddress,
    ownerName,
    ownerContact,
    businessType,
    collateral,
    bussinessPhotoUrl
  ) {
    const createdBussiness = await Bussiness.create({
      businessName,
      loanAmount,
      description,
      physicalAddress,
      ownerName,
      ownerContact,
      businessType,
      collateral,
      bussinessPhotoUrl,
    });

    return createdBussiness;
  }

  static get(id) {
    return Bussiness.findByPk(id, { include: ['loanss'] });
  }

  static getAll(filters) {
    return Bussiness.findAll({
      where: filters,
      include: ['loanss'],
    });
  }

  static async update(
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
  ) {
    return this.partialUpdate({
      id,
      businessName,
      loanAmount,
      description,
      physicalAddress,
      ownerName,
      ownerContact,
      businessType,
      collateral,
      bussinessPhotoUrl,
    });
  }

  static async partialUpdate({
    id,
    businessName,
    loanAmount,
    description,
    physicalAddress,
    ownerName,
    ownerContact,
    businessType,
    collateral,
    bussinessPhotoUrl,
  }) {
    const foundBussiness = await Bussiness.findByPk(id);
    if (!foundBussiness) throw new NotFound(`Bussiness with primary key ${id} not found`);
    if (businessName !== undefined) foundBussiness.businessName = businessName;
    if (loanAmount !== undefined) foundBussiness.loanAmount = loanAmount;
    if (description !== undefined) foundBussiness.description = description;
    if (physicalAddress !== undefined) foundBussiness.physicalAddress = physicalAddress;
    if (ownerName !== undefined) foundBussiness.ownerName = ownerName;
    if (ownerContact !== undefined) foundBussiness.ownerContact = ownerContact;
    if (businessType !== undefined) foundBussiness.businessType = businessType;
    if (collateral !== undefined) foundBussiness.collateral = collateral;
    if (bussinessPhotoUrl !== undefined) foundBussiness.bussinessPhotoUrl = bussinessPhotoUrl;
    await foundBussiness.save();
    return foundBussiness.reload();
  }

  static async destroy(id) {
    const foundBussiness = await Bussiness.findByPk(id);
    if (!foundBussiness) throw new NotFound(`Bussiness with primary key ${id} not found`);
    await foundBussiness.destroy();
    return foundBussiness;
  }
}

export { BussinessRepository };
