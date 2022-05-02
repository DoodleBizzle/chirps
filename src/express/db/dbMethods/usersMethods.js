const {client} = require('../index');
const bcrypt = require('bcryptjs');
const SALT_COUNT = 10;

async function getUserByEmail(email) {
  const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE users.email = $1;
  `, [email]);
  return user;
};

async function getUserById(id) {
  const {rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE users.id = $1
  `, [id]);
  delete user.password;
  return user;
}


module.exports = {
  getUserByEmail,
  getUserById
}