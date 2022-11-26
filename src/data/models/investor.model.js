import { DataTypes } from 'sequelize';

const investorModel = (sequelize) => {
  const Investor = sequelize.define(
    'Investor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      occupation: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      telephoneNumber: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      rates: {
        type: DataTypes.INTEGER,
      },
      profilePhotoUrl: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Investor.associate = (models) => {
    Investor.hasMany(models.Loans, {
      foreignKey: { name: 'investor', allowNull: false },
      as: 'loanss',

      onDelete: 'cascade',
    });
  };
};

export { investorModel };
