import { random, datatype } from 'faker';
import { Investor } from 'data/models';

const buildInvestor = async (investorFks) => {
  const resInvestor = {};

  resInvestor.fullName = random.word().slice(0, 255);
  resInvestor.occupation = random.word().slice(0, 255);
  resInvestor.telephoneNumber = random.word().slice(0, 255);
  resInvestor.emailAddress = random.word().slice(0, 255);
  resInvestor.rates = datatype.number();
  resInvestor.profilePhotoUrl = random.word().slice(0, 255);

  return resInvestor;
};

const createInvestor = async (fakeInvestor) => {
  const investor = await Investor.create(fakeInvestor);
  return investor;
};

export { buildInvestor, createInvestor };
