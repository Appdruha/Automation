import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Optional } from "sequelize";
import Worker from "./worker.ts";
import Session from "./session.ts";

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
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
  id: number

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @HasMany(() => Worker)
  workers: Worker[];

  @HasOne(() => Session)
  session: Session;
}

export default User
















