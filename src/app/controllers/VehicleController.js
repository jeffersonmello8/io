const VehiclesRepository = require('../repositories/VehiclesRepository');

class VehicleController {
  async index(request, response) {
    const vehicles = await VehiclesRepository.findAll();

    response.json(vehicles);
  }

  async show(request, response) {
    const { plate } = request.params;

    if (!plate) {
      return response.status(400).json({ error: 'Plate is required' });
    }

    const regexPlate = /^[a-zA-Z]{3}[0-9]{4}$/;

    if (!regexPlate.test(plate)) {
      return response.status(400).json({ error: 'Plate invalid' });
    }

    const vehicle = await VehiclesRepository.findByPlate(plate);

    if (!vehicle) {
      return response.status(404).json({ error: 'Vehicle not found' });
    }

    response.json(vehicle);
  }

  async store(request, response) {
    const {
      plate, type_id, resident_id,
    } = request.body;

    const requiredFields = ['plate', 'type_id', 'resident_id'];
    let hasMissingField = false;

    requiredFields.forEach((field) => {
      if (!request.body[field]) {
        const errorMessage = `${field} is required`;
        response.status(400).json({ error: errorMessage });
        hasMissingField = true;
      }
    });

    if (hasMissingField) {
      return;
    }

    const regexPlate = /^[a-zA-Z]{3}[0-9]{4}$/;

    if (!regexPlate.test(plate)) {
      return response.status(400).json({ error: 'Plate invalid' });
    }

    const vehicleExists = await VehiclesRepository.findByPlate(plate);

    if (vehicleExists) {
      return response.status(400).json({ error: 'A vehicle with this plate already exists' });
    }

    const vehicle = await VehiclesRepository.create({
      plate, type_id, resident_id,
    });

    response.json(vehicle);
  }

  async delete(request, response) {
    const { id } = request.params;

    await VehiclesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new VehicleController();
