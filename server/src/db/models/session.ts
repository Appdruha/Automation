import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "./user.ts";
import { Optional } from "sequelize";

interface SessionAttributes {
  id: number
  userId: number
  IP?: string
  refresh: string
}

interface SessionCreationAttributes extends Optional<SessionAttributes, "id"> { }

@Table({
  timestamps: false,
  tableName: "sessions",
  modelName: "Session"
})
class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes{
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
  id: number

  @Column({type: DataType.STRING, unique: true})
  IP: string

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  refresh: string

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

export default Session