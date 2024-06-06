const config = {
    port: 3020,
    expireTime: 60 * 60 * 1000,
    /*EMAIL_PASSWORD: "2024PointT", // Replace with your actual password
    EMAIL_USER: "comprobantes5@facturaspoint.net", // Replace with your actual username
    EMAIL_HOST: "mail.facturaspoint.net", // Ensure this is the correct host
    EMAIL_PORT: 587,*/
    EMAIL_PASSWORD: "Ucecepeda@123", // Replace with your actual password
    EMAIL_USER: "ecepeda@krugerschool.edu.ec", // Replace with your actual username
    EMAIL_HOST: "smtp.gmail.com", // Ensure this is the correct host
    EMAIL_PORT: 587,
    EMAIL_SECURE: false,
    getDbConnectionString: function () {
      return "";
    },
    secrets: {
      jwt: process.env.JWT || "mysecret",
    }
  };
  
  module.exports = config;
  