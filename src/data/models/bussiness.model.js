import { DataTypes } from 'sequelize';

const bussinessModel = (sequelize) => {
  const Bussiness = sequelize.define(
    'Bussiness',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      businessName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      loanAmount: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      physicalAddress: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      ownerName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      ownerContact: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      businessType: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      collateral: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      bussinessPhotoUrl: {
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
  Bussiness.associate = (models) => {
    Bussiness.hasMany(models.Loans, {
      foreignKey: { name: 'bussiness', allowNull: false },
      as: 'loanss',

      onDelete: 'cascade',
    });
  };
};

export { bussinessModel };
