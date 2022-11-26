import { datatype } from 'faker';
import { Loans } from 'data/models';
import { buildBussiness, createBussiness } from './bussiness.factory';
import { buildInvestor, createInvestor } from './investor.factory';

const buildLoans = async (loansFks) => {
  const resLoans = {};
  let { investor } = loansFks;
  let { bussiness } = loansFks;

  resLoans.amount = datatype.number();

  if (loansFks.investor === null || typeof loansFks.investor === 'undefined') {
    const fakeInvestor = await buildInvestor({});
    const createdFakeInvestor = await createInvestor(fakeInvestor);
    investor = createdFakeInvestor.id;
  }
  if (loansFks.bussiness === null || typeof loansFks.bussiness === 'undefined') {
    const fakeBussiness = await buildBussiness({});
    const createdFakeBussiness = await createBussiness(fakeBussiness);
    bussiness = createdFakeBussiness.id;
  }
  resLoans.investor = investor;
  resLoans.bussiness = bussiness;

  return resLoans;
};

const createLoans = async (fakeLoans) => {
  const loans = await Loans.create(fakeLoans);
  return loans;
};

export { buildLoans, createLoans };
