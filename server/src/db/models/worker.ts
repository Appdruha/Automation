import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Optional } from "sequelize";
import User from "./user.js";

interface WorkerAttributes {
  id: number
  name: string
  birthday: Date
  personNumber: string
  profession: string
}

interface WorkerCreationAttributes extends Optional<WorkerAttributes, "id"> { }

@Table({
  timestamps: false,
  tableName: "workers",
  modelName: "Worker"
})
export class Worker extends Model<WorkerAttributes, WorkerCreationAttributes> implements WorkerAttributes{
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  personNumber: string

  @Column({type: DataType.STRING, allowNull: false})
  profession: string

  @Column({type: DataType.DATEONLY, allowNull: false})
  birthday: Date


}

export default Worker
















