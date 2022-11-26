import { random, datatype } from 'faker';
import { Bussiness } from 'data/models';

const buildBussiness = async (bussinessFks) => {
  const resBussiness = {};

  resBussiness.businessName = random.word().slice(0, 255);
  resBussiness.loanAmount = datatype.number();
  resBussiness.description = random.word().slice(0, 255);
  resBussiness.physicalAddress = random.word().slice(0, 255);
  resBussiness.ownerName = random.word().slice(0, 255);
  resBussiness.ownerContact = random.word().slice(0, 255);
  resBussiness.businessType = random.word().slice(0, 255);
  resBussiness.collateral = random.word().slice(0, 255);
  resBussiness.bussinessPhotoUrl = random.word().slice(0, 255);

  return resBussiness;
};

const createBussiness = async (fakeBussiness) => {
  const bussiness = await Bussiness.create(fakeBussiness);
  return bussiness;
};

export { buildBussiness, createBussiness };
