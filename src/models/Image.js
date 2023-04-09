import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export default class Image extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            notEmpity: {
              msg: 'O campo não pode ficar vazio'
            }
          }
        }
      },
      filename: {
        type:Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            notEmpity: {
              msg: 'O campo não pode ficar vazio'
            }
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
        }
      },
    }, {
      sequelize,
      tableName: 'images',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
