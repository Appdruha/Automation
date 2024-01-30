import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Optional } from "sequelize";
import Worker from "./worker.js";

interface UserAttributes {
  id: number
  email: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

@Table({
  timestamps: false,
  tableName: "users",
  modelName: "User"
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id: number

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @Column({type: DataType.STRING, allowNull: false})
  password: string


}

export default User
















