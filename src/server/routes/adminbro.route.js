import { sequelize } from '../../data/models';

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.Bussiness,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: [
          'id',
          'businessName',
          'loanAmount',
          'description',
          'physicalAddress',
          'ownerName',
          'ownerContact',
          'businessType',
          'collateral',
          'bussinessPhotoUrl',
        ],
      },
    },
    {
      resource: sequelize.models.Investor,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: [
          'id',
          'fullName',
          'occupation',
          'telephoneNumber',
          'emailAddress',
          'rates',
          'profilePhotoUrl',
        ],
      },
    },
    {
      resource: sequelize.models.Loans,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'amount'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const router = AdminBroExpress.buildRouter(adminBro);

export { router as adminbroRouter };
