const db = require('../../database');

class VehicleRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT vehicles.id,
           vehicles.plate,
           types.description,
           residents.name AS resident,
           residents.phone,
           residents.apartment,
           residents.building
      FROM vehicles
     INNER JOIN residents
        ON residents.id = vehicles.resident_id
     INNER JOIN types
        ON types.id = vehicles.type_id`);
    return rows;
  }

  async findByPlate(plate) {
    const [row] = await db.query(
      `
    SELECT vehicles.id,
           vehicles.plate,
           types.description,
           residents.name AS resident,
           residents.phone,
           residents.apartment,
           residents.building
      FROM vehicles
     INNER JOIN residents
        ON residents.id = vehicles.resident_id
     INNER JOIN types
        ON types.id = vehicles.type_id
     WHERE vehicles.plate = $1`,
      [plate],
    );

    return row;
  }

  async create({
    plate, type_id, resident_id,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO vehicles(plate, type_id, resident_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [plate, type_id, resident_id],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      'DELETE FROM vehicles WHERE id = $1',
      [id],
    );

    return deleteOp;
  }
}

module.exports = new VehicleRepository();
