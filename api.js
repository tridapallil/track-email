const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.API_URL,
  // headers: {
  //   'x-hasura-admin-secret': process.env.GATEWAY_ADMIN_SECRET,
  // },
});

module.exports = instance;
