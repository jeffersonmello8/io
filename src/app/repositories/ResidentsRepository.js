const db = require('../../database');

class ResidentsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM residents ORDER BY name');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM residents WHERE id = $1', [id]);

    return row;
  }

  async findByAddress(apartment, building) {
    const [row] = await db.query(
      'SELECT * FROM residents WHERE apartment = $1 AND building = $2',
      [apartment, building],
    );

    return row;
  }

  async create({
    name, phone, apartment, building,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO residents(name, phone, apartment, building)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, phone, apartment, building],
    );

    return row;
  }

  async update(id, {
    name, phone, apartment, building,
  }) {
    const [row] = await db.query(
      `
      UPDATE residents
      SET name = $1, phone=$2, apartment=$3, building=$4
      WHERE id = $5
      RETURNING *`,
      [name, phone, apartment, building, id],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      'DELETE FROM residents WHERE id = $1',
      [id],
    );

    return deleteOp;
  }
}

module.exports = new ResidentsRepository();
