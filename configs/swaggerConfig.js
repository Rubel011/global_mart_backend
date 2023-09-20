// --------------->>>>>>>> Swagger <<<<<<<<-------------------
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Globalmart Backend",
        version: "1.0.0",
        description:
          "Globalmart is a cutting-edge e-commerce platform built with React.js and Node.js. Experience seamless shopping with advanced features including secure user authentication, product browsing, intuitive cart management, and streamlined payment processing. Elevate your online shopping experience with Globalmart today.",
      },
      servers: [
        {
          url: "http://localhost:8080/api",
        },
      ],
    },
    apis: ["./docs/*.js"],
  };
  const specs = swaggerJsDoc(options);

  module.exports = specs;