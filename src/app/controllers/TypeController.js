const TypesRepository = require('../repositories/TypesRepository');

class TypeController {
  async index(request, response) {
    const types = await TypesRepository.findAll();

    response.json(types);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: 'Id is required' });
    }

    const type = await TypesRepository.findById(id);

    response.json(type);
  }

  async store(request, response) {
    const {
      description,
    } = request.body;

    if (!description) {
      return response.status(400).json({ error: 'Description is required' });
    }

    const typeExists = await TypesRepository.findByDescription(description);

    if (typeExists) {
      return response.status(400).json({ error: 'A type with this description already exists' });
    }

    const type = await TypesRepository.create({
      description,
    });

    response.json(type);
  }

  async delete(request, response) {
    const { id } = request.params;

    await TypesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new TypeController();
