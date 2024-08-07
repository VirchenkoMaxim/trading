const { CommonRepository } = require('../../common/common.repository')
const mongoose = require('mongoose')
const { dbCollectionNames } = require('../../enum/db')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tradingSymbolsIds: { type: [String] },
})

class UsersRepository extends CommonRepository {
  constructor() {
    super(mongoose.model(dbCollectionNames.USERS, UserSchema, dbCollectionNames.USERS))
  }
}

module.exports = UsersRepository
