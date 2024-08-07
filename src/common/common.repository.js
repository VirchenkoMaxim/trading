class CommonRepository {
  constructor(model) {
    this.model = model
    this.name = model.modelName
  }

  _toObjectOptions = {
    flattenMaps: true,
    virtuals: true,
  }

  async createOne(body) {
    const result = await this.model.create(body)
    return result.toObject(this._toObjectOptions)
  }

  async findOneById(id, options = {}) {
    const result = await this.model.findById(id).select(options.select).populate(options.populate)
    return result ? result.toObject(this._toObjectOptions) : result
  }

  async findOneByFilter(filter, options = {}) {
    const result = await this.model.findOne(filter).select(options.select).populate(options.populate)
    return result ? result.toObject(this._toObjectOptions) : result
  }

  async findList(filter, options = {}) {
    const result = await this.model.find(filter).select(options.select).populate(options.populate)
    return result.map((doc) => doc.toObject(this._toObjectOptions))
  }

  async updateOneById(id, body, options = undefined) {
    const toUpdate = await this.model.findById(id, {}, options)
    if (!toUpdate) return null

    Object.assign(toUpdate, body)
    const result = await toUpdate.save(options)

    return result.toObject(this._toObjectOptions)
  }

  async runModificationCommand(filter, command, options) {
    const result = await this.model.findOneAndUpdate(filter, command, { new: true, runValidators: true, ...options })
    return result ? result.toObject(this._toObjectOptions) : result
  }
}

exports.CommonRepository = CommonRepository
