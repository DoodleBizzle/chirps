const bcrypt = require('bcryptjs');
const SALT_COUNT = 10;

const {
  client,
  // other db methods
} = require("./index")

async function rebuildDB() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);

    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );

    `)   
  } catch (error) {
    throw error
  }
}

async function seedData() {
  try {

  const users = [
    { username: "testuser", password: "testuser999", email: "testuser@test.com"}
  ];

  for(const user of users) {
    const hashed = await bcrypt.hash(user.password, SALT_COUNT);
    await client.query(`
      INSERT INTO users
      (username, password, email)
      VALUES ($1, $2, $3);
    `,[user.username, hashed, user.email]);
  }

  // create useful starting data
  } catch (error) {
    throw error
  }
}

module.exports = {
  rebuildDB,
  seedData,
}