const bcrypt = require('bcryptjs');
const SALT_COUNT = 10;

const {
  client,
  // other db methods
} = require("./index")

async function rebuildDB() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS blocked;
      DROP TABLE IF EXISTS following;
      DROP TABLE IF EXISTS rechirps;
      DROP TABLE IF EXISTS chirps;
      DROP TABLE IF EXISTS users;
    `);

    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,
        block_id SERIAL UNIQUE,
        following_id SERIAL UNIQUE,
        rechirp_id SERIAL UNIQUE
      );

      CREATE TABLE chirps(
        id SERIAL PRIMARY KEY,
        author_id INTEGER REFERENCES users(id) NOT NULL,
        chirp VARCHAR(300) NOT NULL
      );

      CREATE TABLE rechirps(
        id SERIAL PRIMARY KEY,
        chirp_id INTEGER REFERENCES chirps(id) NOT NULL,
        rechirp_id INTEGER REFERENCES users(rechirp_id) NOT NULL
      );

      CREATE TABLE following(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        following INTEGER REFERENCES users(following_id) NOT NULL
      );
      
      CREATE TABLE blocked(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        blocked INTEGER REFERENCES users(block_id) NOT NULL
      );

    `)   
  } catch (error) {
    throw error
  }
}

async function seedData() {
  try {

  const users = [
    { username: "Doodle", password: "testuser999", email: "testuser1@test.com"},
    { username: "Court89", password: "testuser999", email: "testuser2@test.com"},
    { username: "testuser", password: "testuser999", email: "testuser@test.com"},
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