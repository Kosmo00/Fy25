import Sequelize from 'sequelize'
import config_file from './config/config.json'

const config = config_file['development']

let sequelize = new Sequelize(config.database, config.username, config.password, config);

const connection = sequelize

export default connection

