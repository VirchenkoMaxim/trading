const { CommonRepository } = require('../../common/common.repository')
const mongoose = require('mongoose')
const { enums } = require('../../shared')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tradingSymbolsIds: { type: [String] },
})

class UsersRepository extends CommonRepository {
  constructor() {
    super(mongoose.model(enums.db.collectionNames.USERS, UserSchema, enums.db.collectionNames.USERS))
  }
}

module.exports = UsersRepository
