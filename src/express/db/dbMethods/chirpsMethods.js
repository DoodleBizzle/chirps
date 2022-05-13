const {client} = require('../index');

async function getAllChirps() {
  const {rows} = await client.query(`
    SELECT chirps.id, author_id, chirp, username, block_id, following_id, rechirp_id
    FROM chirps
    JOIN users
    ON users.id = chirps.author_id;
  `);
  return rows;
};

module.exports = {
  getAllChirps,
}