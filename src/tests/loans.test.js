import request from 'supertest';
import { Loans, Investor, Bussiness } from 'data/models';
import { app } from 'server/app';
import {
  buildLoans,
  buildInvestor,
  buildBussiness,
  createLoans,
  createInvestor,
  createBussiness,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/loans';

describe('Loans tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created loans', async () => {
    const relInvestorDict = await buildInvestor({});
    const relFakeInvestor = await createInvestor(relInvestorDict);
    const relBussinessDict = await buildBussiness({});
    const relFakeBussiness = await createBussiness(relBussinessDict);

    const fakeLoans = await buildLoans({
      investor: relFakeInvestor.id,
      bussiness: relFakeBussiness.id,
    });

    const response = await request(app).post(ENDPOINT).send(fakeLoans);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseLoans = response.body.data;

    const loans = await Loans.findByPk(responseLoans.id);

    expect(loans.amount).toBe(fakeLoans.amount);

    expect(loans.investor).toBe(fakeLoans.investor);
    expect(loans.bussiness).toBe(fakeLoans.bussiness);
  });

  test('/POST - investor does not exists, loans cant be created', async () => {
    const fakeLoans = await buildLoans({});
    const investor = await Investor.findOne({ where: { id: fakeLoans.investor } });
    await investor.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeLoans);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - bussiness does not exists, loans cant be created', async () => {
    const fakeLoans = await buildLoans({});
    const bussiness = await Bussiness.findOne({ where: { id: fakeLoans.bussiness } });
    await bussiness.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeLoans);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a loans', async () => {
    const relInvestorDict = await buildInvestor({});
    const relFakeInvestor = await createInvestor(relInvestorDict);
    const relBussinessDict = await buildBussiness({});
    const relFakeBussiness = await createBussiness(relBussinessDict);

    const loansDict = await buildLoans({
      investor: relFakeInvestor.id,
      bussiness: relFakeBussiness.id,
    });
    const fakeLoans = await createLoans(loansDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeLoans.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeLoans.id);
    expect(data.amount).toBe(fakeLoans.amount);

    expect(data.investor).toBe(fakeLoans.investor);
    expect(data.bussiness).toBe(fakeLoans.bussiness);
  });
  test('/GET - Response with a loans not found', async () => {
    const loansDict = await buildLoans({});
    const fakeLoans = await createLoans(loansDict);
    const { id } = fakeLoans;
    await fakeLoans.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of loanss', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allLoans = await Loans.findAll();
    expect(data.length).toBe(allLoans.length);
  });
  test('/PUT - Response with an updated loans', async () => {
    const relInvestorDict = await buildInvestor({});
    const relFakeInvestor = await createInvestor(relInvestorDict);
    const relBussinessDict = await buildBussiness({});
    const relFakeBussiness = await createBussiness(relBussinessDict);

    const loansDict = await buildLoans({
      investor: relFakeInvestor.id,
      bussiness: relFakeBussiness.id,
    });
    const fakeLoans = await createLoans(loansDict);

    const anotherInvestorDict = await buildInvestor({});
    const anotherrelFakeInvestor = await createInvestor(anotherInvestorDict);
    const anotherBussinessDict = await buildBussiness({});
    const anotherrelFakeBussiness = await createBussiness(anotherBussinessDict);

    const anotherFakeLoans = await buildLoans({
      investor: anotherrelFakeInvestor.id,
      bussiness: anotherrelFakeBussiness.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeLoans.id}`).send({
      amount: anotherFakeLoans.amount,
      investor: anotherFakeLoans.investor,
      bussiness: anotherFakeLoans.bussiness,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.amount).toBe(anotherFakeLoans.amount);
    expect(data.investor).toBe(anotherFakeLoans.investor);
    expect(data.bussiness).toBe(anotherFakeLoans.bussiness);

    const updatedLoans = await Loans.findByPk(fakeLoans.id);

    expect(updatedLoans.amount).toBe(anotherFakeLoans.amount);

    expect(updatedLoans.investor).toBe(anotherFakeLoans.investor);
    expect(updatedLoans.bussiness).toBe(anotherFakeLoans.bussiness);
  });

  test('/PUT - investor does not exists, loans cant be updated', async () => {
    const relInvestorDict = await buildInvestor({});
    const relFakeInvestor = await createInvestor(relInvestorDict);
    const relBussinessDict = await buildBussiness({});
    const relFakeBussiness = await createBussiness(relBussinessDict);

    const loansDict = await buildLoans({
      investor: relFakeInvestor.id,
      bussiness: relFakeBussiness.id,
    });
    const fakeLoans = await createLoans(loansDict);

    const anotherInvestorDict = await buildInvestor({});
    const anotherrelFakeInvestor = await createInvestor(anotherInvestorDict);

    loansDict.investor = anotherrelFakeInvestor.id;

    await anotherrelFakeInvestor.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeLoans.id}`).send({
      amount: loansDict.amount,
      investor: loansDict.investor,
      bussiness: loansDict.bussiness,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - bussiness does not exists, loans cant be updated', async () => {
    const relInvestorDict = await buildInvestor({});
    const relFakeInvestor = await createInvestor(relInvestorDict);
    const relBussinessDict = await buildBussiness({});
    const relFakeBussiness = await createBussiness(relBussinessDict);

    const loansDict = await buildLoans({
      investor: relFakeInvestor.id,
      bussiness: relFakeBussiness.id,
    });
    const fakeLoans = await createLoans(loansDict);

    const anotherBussinessDict = await buildBussiness({});
    const anotherrelFakeBussiness = await createBussiness(anotherBussinessDict);

    loansDict.bussiness = anotherrelFakeBussiness.id;

    await anotherrelFakeBussiness.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeLoans.id}`).send({
      amount: loansDict.amount,
      investor: loansDict.investor,
      bussiness: loansDict.bussiness,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Loans does not exists, loans cant be updated', async () => {
    const loansDict = await buildLoans({});
    const fakeLoans = await createLoans(loansDict);
    const { id } = fakeLoans;
    await fakeLoans.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      amount: loansDict.amount,
      investor: loansDict.investor,
      bussiness: loansDict.bussiness,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated loans (no updates)', async () => {
    const relInvestorDict = await buildInvestor({});
    const relFakeInvestor = await createInvestor(relInvestorDict);
    const relBussinessDict = await buildBussiness({});
    const relFakeBussiness = await createBussiness(relBussinessDict);

    const loansDict = await buildLoans({
      investor: relFakeInvestor.id,
      bussiness: relFakeBussiness.id,
    });
    const fakeLoans = await createLoans(loansDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeLoans.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted loans', async () => {
    const loansDict = await buildLoans({});
    const fakeLoans = await createLoans(loansDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeLoans.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeLoans.id);

    const deletedLoans = await Loans.findByPk(fakeLoans.id);
    expect(deletedLoans).toBe(null);
  });

  test('/DELETE - Loans does not exists, loans cant be deleted', async () => {
    const loansDict = await buildLoans({});
    const fakeLoans = await createLoans(loansDict);
    const { id } = fakeLoans;
    await fakeLoans.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
