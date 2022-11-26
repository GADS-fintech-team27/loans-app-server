import { BussinessRepository } from 'data/repositories';

class BussinessService {
  static create(
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
    return BussinessRepository.create(
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
  }

  static get(id) {
    return BussinessRepository.get(id);
  }

  static getAll(args) {
    return BussinessRepository.getAll(args);
  }

  static update(
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
    return BussinessRepository.update(
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
  }

  static partialUpdate(
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
    return BussinessRepository.partialUpdate({
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

  static destroy(id) {
    return BussinessRepository.destroy(id);
  }
}

export { BussinessService };
