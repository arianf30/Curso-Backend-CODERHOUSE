import MongoContainer from '../containers/MongoContainer.js'

class UserDaoMongoDb extends MongoContainer {
  constructor () {
    super('users', {
      email: String,
      name: String,
      passwordHash: String,
      notes: [Object]
    })
  }
}

export default UserDaoMongoDb
