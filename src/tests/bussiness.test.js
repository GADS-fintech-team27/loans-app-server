import request from 'supertest';
import { Bussiness } from 'data/models';
import { app } from 'server/app';
import { buildBussiness, createBussiness } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/bussiness';

describe('Bussiness tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created bussiness', async () => {
    const fakeBussiness = await buildBussiness({});

    const response = await request(app).post(ENDPOINT).send(fakeBussiness);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseBussiness = response.body.data;

    const bussiness = await Bussiness.findByPk(responseBussiness.id);

    expect(bussiness.businessName).toBe(fakeBussiness.businessName);
    expect(bussiness.loanAmount).toBe(fakeBussiness.loanAmount);
    expect(bussiness.description).toBe(fakeBussiness.description);
    expect(bussiness.physicalAddress).toBe(fakeBussiness.physicalAddress);
    expect(bussiness.ownerName).toBe(fakeBussiness.ownerName);
    expect(bussiness.ownerContact).toBe(fakeBussiness.ownerContact);
    expect(bussiness.businessType).toBe(fakeBussiness.businessType);
    expect(bussiness.collateral).toBe(fakeBussiness.collateral);
    expect(bussiness.bussinessPhotoUrl).toBe(fakeBussiness.bussinessPhotoUrl);
  });

  test('/GET - Response with a bussiness', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeBussiness.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeBussiness.id);
    expect(data.businessName).toBe(fakeBussiness.businessName);
    expect(data.loanAmount).toBe(fakeBussiness.loanAmount);
    expect(data.description).toBe(fakeBussiness.description);
    expect(data.physicalAddress).toBe(fakeBussiness.physicalAddress);
    expect(data.ownerName).toBe(fakeBussiness.ownerName);
    expect(data.ownerContact).toBe(fakeBussiness.ownerContact);
    expect(data.businessType).toBe(fakeBussiness.businessType);
    expect(data.collateral).toBe(fakeBussiness.collateral);
    expect(data.bussinessPhotoUrl).toBe(fakeBussiness.bussinessPhotoUrl);

    expect(data.loanss).toEqual([]);
  });
  test('/GET - Response with a bussiness not found', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);
    const { id } = fakeBussiness;
    await fakeBussiness.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of bussinesss', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allBussiness = await Bussiness.findAll();
    expect(data.length).toBe(allBussiness.length);
  });
  test('/PUT - Response with an updated bussiness', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);

    const anotherFakeBussiness = await buildBussiness({});

    const response = await request(app).put(`${ENDPOINT}/${fakeBussiness.id}`).send({
      businessName: anotherFakeBussiness.businessName,
      loanAmount: anotherFakeBussiness.loanAmount,
      description: anotherFakeBussiness.description,
      physicalAddress: anotherFakeBussiness.physicalAddress,
      ownerName: anotherFakeBussiness.ownerName,
      ownerContact: anotherFakeBussiness.ownerContact,
      businessType: anotherFakeBussiness.businessType,
      collateral: anotherFakeBussiness.collateral,
      bussinessPhotoUrl: anotherFakeBussiness.bussinessPhotoUrl,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.businessName).toBe(anotherFakeBussiness.businessName);
    expect(data.loanAmount).toBe(anotherFakeBussiness.loanAmount);
    expect(data.description).toBe(anotherFakeBussiness.description);
    expect(data.physicalAddress).toBe(anotherFakeBussiness.physicalAddress);
    expect(data.ownerName).toBe(anotherFakeBussiness.ownerName);
    expect(data.ownerContact).toBe(anotherFakeBussiness.ownerContact);
    expect(data.businessType).toBe(anotherFakeBussiness.businessType);
    expect(data.collateral).toBe(anotherFakeBussiness.collateral);
    expect(data.bussinessPhotoUrl).toBe(anotherFakeBussiness.bussinessPhotoUrl);

    const updatedBussiness = await Bussiness.findByPk(fakeBussiness.id);

    expect(updatedBussiness.businessName).toBe(anotherFakeBussiness.businessName);
    expect(updatedBussiness.loanAmount).toBe(anotherFakeBussiness.loanAmount);
    expect(updatedBussiness.description).toBe(anotherFakeBussiness.description);
    expect(updatedBussiness.physicalAddress).toBe(anotherFakeBussiness.physicalAddress);
    expect(updatedBussiness.ownerName).toBe(anotherFakeBussiness.ownerName);
    expect(updatedBussiness.ownerContact).toBe(anotherFakeBussiness.ownerContact);
    expect(updatedBussiness.businessType).toBe(anotherFakeBussiness.businessType);
    expect(updatedBussiness.collateral).toBe(anotherFakeBussiness.collateral);
    expect(updatedBussiness.bussinessPhotoUrl).toBe(anotherFakeBussiness.bussinessPhotoUrl);
  });

  test('/PUT - Bussiness does not exists, bussiness cant be updated', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);
    const { id } = fakeBussiness;
    await fakeBussiness.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      businessName: bussinessDict.businessName,
      loanAmount: bussinessDict.loanAmount,
      description: bussinessDict.description,
      physicalAddress: bussinessDict.physicalAddress,
      ownerName: bussinessDict.ownerName,
      ownerContact: bussinessDict.ownerContact,
      businessType: bussinessDict.businessType,
      collateral: bussinessDict.collateral,
      bussinessPhotoUrl: bussinessDict.bussinessPhotoUrl,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated bussiness (no updates)', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeBussiness.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated bussiness', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);

    const anotherFakeBussiness = await buildBussiness({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeBussiness.id}`)
      .send({ businessName: anotherFakeBussiness.businessName });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.businessName).toBe(anotherFakeBussiness.businessName);

    const updatedBussiness = await Bussiness.findByPk(fakeBussiness.id);

    expect(updatedBussiness.businessName).toBe(anotherFakeBussiness.businessName);
  });

  test('/PATCH - Bussiness does not exists, bussiness cant be updated', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);
    const { id } = fakeBussiness;
    const { businessName } = fakeBussiness;
    await fakeBussiness.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ businessName });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted bussiness', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeBussiness.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeBussiness.id);

    const deletedBussiness = await Bussiness.findByPk(fakeBussiness.id);
    expect(deletedBussiness).toBe(null);
  });

  test('/DELETE - Bussiness does not exists, bussiness cant be deleted', async () => {
    const bussinessDict = await buildBussiness({});
    const fakeBussiness = await createBussiness(bussinessDict);
    const { id } = fakeBussiness;
    await fakeBussiness.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
