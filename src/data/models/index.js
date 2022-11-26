import Sequelize from 'sequelize';
import config from 'config';

import { bussinessModel } from './bussiness.model';
import { investorModel } from './investor.model';
import { loansModel } from './loans.model';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
});

bussinessModel(sequelize);
investorModel(sequelize);
loansModel(sequelize);

const { Bussiness, Investor, Loans } = sequelize.models;

Bussiness.associate(sequelize.models);
Investor.associate(sequelize.models);
Loans.associate(sequelize.models);

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, Bussiness, Investor, Loans };
