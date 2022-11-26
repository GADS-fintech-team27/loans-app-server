import { InvestorRepository } from 'data/repositories';

class InvestorService {
  static create(fullName, occupation, telephoneNumber, emailAddress, rates, profilePhotoUrl) {
    return InvestorRepository.create(
      fullName,
      occupation,
      telephoneNumber,
      emailAddress,
      rates,
      profilePhotoUrl
    );
  }

  static get(id) {
    return InvestorRepository.get(id);
  }

  static getAll(args) {
    return InvestorRepository.getAll(args);
  }

  static update(id, fullName, occupation, telephoneNumber, emailAddress, rates, profilePhotoUrl) {
    return InvestorRepository.update(
      id,
      fullName,
      occupation,
      telephoneNumber,
      emailAddress,
      rates,
      profilePhotoUrl
    );
  }

  static partialUpdate(
    id,
    fullName,
    occupation,
    telephoneNumber,
    emailAddress,
    rates,
    profilePhotoUrl
  ) {
    return InvestorRepository.partialUpdate({
      id,
      fullName,
      occupation,
      telephoneNumber,
      emailAddress,
      rates,
      profilePhotoUrl,
    });
  }

  static destroy(id) {
    return InvestorRepository.destroy(id);
  }
}

export { InvestorService };
