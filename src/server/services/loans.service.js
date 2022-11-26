import { LoansRepository } from 'data/repositories';

class LoansService {
  static create(amount, investor, bussiness) {
    return LoansRepository.create(amount, investor, bussiness);
  }

  static get(id) {
    return LoansRepository.get(id);
  }

  static getAll(args) {
    return LoansRepository.getAll(args);
  }

  static update(id, amount, investor, bussiness) {
    return LoansRepository.update(id, amount, investor, bussiness);
  }

  static partialUpdate(id, amount, investor, bussiness) {
    return LoansRepository.partialUpdate({ id, amount, investor, bussiness });
  }

  static destroy(id) {
    return LoansRepository.destroy(id);
  }
}

export { LoansService };
