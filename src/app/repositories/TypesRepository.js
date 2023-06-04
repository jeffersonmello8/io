const db = require('../../database');

class TypesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM types ORDER BY description');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM types WHERE id = $1', [id]);

    return row;
  }

  async findByDescription(description) {
    const [row] = await db.query('SELECT * FROM types WHERE description = $1', [description]);

    return row;
  }

  async create({
    description,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO types(description)
      VALUES ($1)
      RETURNING *`,
      [description],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      'DELETE FROM types WHERE id = $1',
      [id],
    );

    return deleteOp;
  }
}

module.exports = new TypesRepository();
