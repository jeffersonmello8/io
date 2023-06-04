const ResidentsRepository = require('../repositories/ResidentsRepository');

class ResidentController {
  async index(request, response) {
    const residents = await ResidentsRepository.findAll();

    response.json(residents);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: 'Id is required' });
    }

    const resident = await ResidentsRepository.findById(id);

    response.json(resident);
  }

  async store(request, response) {
    const {
      name, phone, apartment, building,
    } = request.body;

    const requiredFields = ['name', 'apartment', 'building'];
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

    const residentExists = await ResidentsRepository.findByAddress(apartment, building);

    if (residentExists) {
      return response.status(400).json({ error: 'This resident already has a registration' });
    }

    const resident = await ResidentsRepository.create({
      name, phone, apartment, building,
    });

    response.json(resident);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, phone, apartment, building,
    } = request.body;

    const residentExistsById = await ResidentsRepository.findById(id);

    if (!residentExistsById) {
      return response.status(404).json({ error: 'Resident not found' });
    }

    const requiredFields = ['name', 'apartment', 'building'];
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

    const residentExistsByAddress = await ResidentsRepository.findByAddress(apartment, building);

    if (residentExistsByAddress && residentExistsByAddress.id !== id) {
      return response.status(400).json({ error: 'This address already exists for another resident' });
    }

    const contact = await ResidentsRepository.update(id, {
      name, phone, apartment, building,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ResidentsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ResidentController();
