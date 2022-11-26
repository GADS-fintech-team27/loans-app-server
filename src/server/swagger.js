const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/bussiness/': {
      get: {
        summary: 'Lists all the bussinesss',
        tags: ['bussiness'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Bussiness',
            },
          },
        },
      },
      post: {
        summary: 'Creates a bussiness',
        tags: ['bussiness'],
        parameters: [
          {
            name: 'bussiness',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBussiness',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new bussiness',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBussiness',
            },
          },
        },
      },
    },
    '/bussiness/{id}': {
      get: {
        summary: 'Gets a bussiness by its primary key',
        tags: ['bussiness'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a bussiness with primary key',
            schema: {
              $ref: '#/definitions/Bussiness',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a bussiness by its primary key',
        tags: ['bussiness'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a bussiness',
        tags: ['bussiness'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Bussiness',
            },
          },
          {
            name: 'bussiness',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBussiness',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a bussiness',
            schema: {
              $ref: '#/definitions/Bussiness',
            },
          },
        },
      },
      patch: {
        tags: ['bussiness'],
        summary: 'patch a bussiness',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Bussiness',
            },
          },
          {
            name: 'bussiness',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBussiness',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a bussiness and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Bussiness',
            },
          },
        },
      },
    },

    '/investor/': {
      get: {
        summary: 'Lists all the investors',
        tags: ['investor'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Investor',
            },
          },
        },
      },
      post: {
        summary: 'Creates a investor',
        tags: ['investor'],
        parameters: [
          {
            name: 'investor',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateInvestor',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new investor',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateInvestor',
            },
          },
        },
      },
    },
    '/investor/{id}': {
      get: {
        summary: 'Gets a investor by its primary key',
        tags: ['investor'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a investor with primary key',
            schema: {
              $ref: '#/definitions/Investor',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a investor by its primary key',
        tags: ['investor'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a investor',
        tags: ['investor'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Investor',
            },
          },
          {
            name: 'investor',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateInvestor',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a investor',
            schema: {
              $ref: '#/definitions/Investor',
            },
          },
        },
      },
      patch: {
        tags: ['investor'],
        summary: 'patch a investor',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Investor',
            },
          },
          {
            name: 'investor',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateInvestor',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a investor and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Investor',
            },
          },
        },
      },
    },

    '/loans/': {
      get: {
        summary: 'Lists all the loanss',
        tags: ['loans'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Loans',
            },
          },
        },
      },
      post: {
        summary: 'Creates a loans',
        tags: ['loans'],
        parameters: [
          {
            name: 'loans',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateLoans',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new loans',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateLoans',
            },
          },
        },
      },
    },
    '/loans/{id}': {
      get: {
        summary: 'Gets a loans by its primary key',
        tags: ['loans'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a loans with primary key',
            schema: {
              $ref: '#/definitions/Loans',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a loans by its primary key',
        tags: ['loans'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a loans',
        tags: ['loans'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Loans',
            },
          },
          {
            name: 'loans',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateLoans',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a loans',
            schema: {
              $ref: '#/definitions/Loans',
            },
          },
        },
      },
      patch: {
        tags: ['loans'],
        summary: 'patch a loans',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Loans',
            },
          },
          {
            name: 'loans',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateLoans',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a loans and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Loans',
            },
          },
        },
      },
    },
  },
  definitions: {
    Bussiness: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        businessName: {
          type: 'string',
          maxLength: 255,
        },
        loanAmount: {
          type: 'integer',
          format: 'int32',
        },
        description: {
          type: 'string',
          maxLength: 255,
        },
        physicalAddress: {
          type: 'string',
          maxLength: 255,
        },
        ownerName: {
          type: 'string',
          maxLength: 255,
        },
        ownerContact: {
          type: 'string',
          maxLength: 255,
        },
        businessType: {
          type: 'string',
          maxLength: 255,
        },
        collateral: {
          type: 'string',
          maxLength: 255,
        },
        bussinessPhotoUrl: {
          type: 'string',
          maxLength: 255,
        },
        loanss: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Investor: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        fullName: {
          type: 'string',
          maxLength: 255,
        },
        occupation: {
          type: 'string',
          maxLength: 255,
        },
        telephoneNumber: {
          type: 'string',
          maxLength: 255,
        },
        emailAddress: {
          type: 'string',
          maxLength: 255,
        },
        rates: {
          type: 'integer',
          format: 'int32',
        },
        profilePhotoUrl: {
          type: 'string',
          maxLength: 255,
        },
        loanss: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Loans: {
      required: ['investor', 'bussiness'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        amount: {
          type: 'integer',
          format: 'int32',
        },
        investor: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        bussiness: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateBussiness: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        businessName: {
          type: 'string',
          maxLength: 255,
        },
        loanAmount: {
          type: 'integer',
          format: 'int32',
        },
        description: {
          type: 'string',
          maxLength: 255,
        },
        physicalAddress: {
          type: 'string',
          maxLength: 255,
        },
        ownerName: {
          type: 'string',
          maxLength: 255,
        },
        ownerContact: {
          type: 'string',
          maxLength: 255,
        },
        businessType: {
          type: 'string',
          maxLength: 255,
        },
        collateral: {
          type: 'string',
          maxLength: 255,
        },
        bussinessPhotoUrl: {
          type: 'string',
          maxLength: 255,
        },
      },
    },

    CreateUpdateInvestor: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        fullName: {
          type: 'string',
          maxLength: 255,
        },
        occupation: {
          type: 'string',
          maxLength: 255,
        },
        telephoneNumber: {
          type: 'string',
          maxLength: 255,
        },
        emailAddress: {
          type: 'string',
          maxLength: 255,
        },
        rates: {
          type: 'integer',
          format: 'int32',
        },
        profilePhotoUrl: {
          type: 'string',
          maxLength: 255,
        },
      },
    },

    CreateUpdateLoans: {
      required: ['investor', 'bussiness'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        amount: {
          type: 'integer',
          format: 'int32',
        },
        investor: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        bussiness: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },
  },
};

export { swaggerDocument };
