import { DataTypes } from 'sequelize';

const loansModel = (sequelize) => {
  const Loans = sequelize.define(
    'Loans',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Loans.associate = (models) => {
    Loans.belongsTo(models.Investor, {
      foreignKey: { name: 'investor', allowNull: false },
      as: 'investor_',
    });
    Loans.belongsTo(models.Bussiness, {
      foreignKey: { name: 'bussiness', allowNull: false },
      as: 'bussiness_',
    });
  };
};

export { loansModel };
