import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticketera API',
      version: '1.0.0',
      description: 'Documentación de la API de gestión de tickets'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts', './src/docs/schemas/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
