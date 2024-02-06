import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "./user.ts";
import { Optional } from "sequelize";

interface WorkerAttributes {
  name: string
  birthday: Date
  personNumber: string
  profession: string
  userId: number
}

@Table({
  timestamps: false,
  tableName: "workers",
  modelName: "Worker"
})
class Worker extends Model<WorkerAttributes> implements WorkerAttributes{
  @Column({type: DataType.STRING, primaryKey: true, unique: true})
  personNumber: string

  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @Column({type: DataType.STRING, allowNull: false})
  profession: string

  @Column({type: DataType.DATEONLY, allowNull: false})
  birthday: Date

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

export default Worker