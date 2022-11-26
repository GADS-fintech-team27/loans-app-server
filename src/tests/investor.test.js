import request from 'supertest';
import { Investor } from 'data/models';
import { app } from 'server/app';
import { buildInvestor, createInvestor } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/investor';

describe('Investor tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created investor', async () => {
    const fakeInvestor = await buildInvestor({});

    const response = await request(app).post(ENDPOINT).send(fakeInvestor);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseInvestor = response.body.data;

    const investor = await Investor.findByPk(responseInvestor.id);

    expect(investor.fullName).toBe(fakeInvestor.fullName);
    expect(investor.occupation).toBe(fakeInvestor.occupation);
    expect(investor.telephoneNumber).toBe(fakeInvestor.telephoneNumber);
    expect(investor.emailAddress).toBe(fakeInvestor.emailAddress);
    expect(investor.rates).toBe(fakeInvestor.rates);
    expect(investor.profilePhotoUrl).toBe(fakeInvestor.profilePhotoUrl);
  });

  test('/GET - Response with a investor', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeInvestor.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeInvestor.id);
    expect(data.fullName).toBe(fakeInvestor.fullName);
    expect(data.occupation).toBe(fakeInvestor.occupation);
    expect(data.telephoneNumber).toBe(fakeInvestor.telephoneNumber);
    expect(data.emailAddress).toBe(fakeInvestor.emailAddress);
    expect(data.rates).toBe(fakeInvestor.rates);
    expect(data.profilePhotoUrl).toBe(fakeInvestor.profilePhotoUrl);

    expect(data.loanss).toEqual([]);
  });
  test('/GET - Response with a investor not found', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);
    const { id } = fakeInvestor;
    await fakeInvestor.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of investors', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allInvestor = await Investor.findAll();
    expect(data.length).toBe(allInvestor.length);
  });
  test('/PUT - Response with an updated investor', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);

    const anotherFakeInvestor = await buildInvestor({});

    const response = await request(app).put(`${ENDPOINT}/${fakeInvestor.id}`).send({
      fullName: anotherFakeInvestor.fullName,
      occupation: anotherFakeInvestor.occupation,
      telephoneNumber: anotherFakeInvestor.telephoneNumber,
      emailAddress: anotherFakeInvestor.emailAddress,
      rates: anotherFakeInvestor.rates,
      profilePhotoUrl: anotherFakeInvestor.profilePhotoUrl,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.fullName).toBe(anotherFakeInvestor.fullName);
    expect(data.occupation).toBe(anotherFakeInvestor.occupation);
    expect(data.telephoneNumber).toBe(anotherFakeInvestor.telephoneNumber);
    expect(data.emailAddress).toBe(anotherFakeInvestor.emailAddress);
    expect(data.rates).toBe(anotherFakeInvestor.rates);
    expect(data.profilePhotoUrl).toBe(anotherFakeInvestor.profilePhotoUrl);

    const updatedInvestor = await Investor.findByPk(fakeInvestor.id);

    expect(updatedInvestor.fullName).toBe(anotherFakeInvestor.fullName);
    expect(updatedInvestor.occupation).toBe(anotherFakeInvestor.occupation);
    expect(updatedInvestor.telephoneNumber).toBe(anotherFakeInvestor.telephoneNumber);
    expect(updatedInvestor.emailAddress).toBe(anotherFakeInvestor.emailAddress);
    expect(updatedInvestor.rates).toBe(anotherFakeInvestor.rates);
    expect(updatedInvestor.profilePhotoUrl).toBe(anotherFakeInvestor.profilePhotoUrl);
  });

  test('/PUT - Investor does not exists, investor cant be updated', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);
    const { id } = fakeInvestor;
    await fakeInvestor.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      fullName: investorDict.fullName,
      occupation: investorDict.occupation,
      telephoneNumber: investorDict.telephoneNumber,
      emailAddress: investorDict.emailAddress,
      rates: investorDict.rates,
      profilePhotoUrl: investorDict.profilePhotoUrl,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated investor (no updates)', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeInvestor.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated investor', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);

    const anotherFakeInvestor = await buildInvestor({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeInvestor.id}`)
      .send({ fullName: anotherFakeInvestor.fullName });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.fullName).toBe(anotherFakeInvestor.fullName);

    const updatedInvestor = await Investor.findByPk(fakeInvestor.id);

    expect(updatedInvestor.fullName).toBe(anotherFakeInvestor.fullName);
  });

  test('/PATCH - Investor does not exists, investor cant be updated', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);
    const { id } = fakeInvestor;
    const { fullName } = fakeInvestor;
    await fakeInvestor.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ fullName });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted investor', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeInvestor.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeInvestor.id);

    const deletedInvestor = await Investor.findByPk(fakeInvestor.id);
    expect(deletedInvestor).toBe(null);
  });

  test('/DELETE - Investor does not exists, investor cant be deleted', async () => {
    const investorDict = await buildInvestor({});
    const fakeInvestor = await createInvestor(investorDict);
    const { id } = fakeInvestor;
    await fakeInvestor.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
