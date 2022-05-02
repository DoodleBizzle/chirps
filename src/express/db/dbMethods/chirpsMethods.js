const {client} = require('../index');

async function getAllChirps() {
  const {rows} = await client.query(`
    SELECT *
    FROM chirps
  `);
  return rows;
};

module.exports = {
  getAllChirps,
}