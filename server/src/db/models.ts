import { Column, DataType, Model, Table } from "sequelize-typescript";
import sequelize from './index.js'
import { UserAttributes, UserCreationAttributes } from "../types/user.js";

@Table({timestamps: false})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id: number
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string
  @Column({type: DataType.STRING, allowNull: false})
  password: string

}


// export const User = sequelize.define(
//   'user',
//   {
//     id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
//     email: { type: DataType.STRING, unique: true, allowNull: false },
//     password: { type: DataType.STRING, allowNull: false },
//   },
//   { timestamps: false },
// )

export const Worker = sequelize.define(
  'worker',
  {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataType.STRING, allowNull: false },
    personNumber: { type: DataType.STRING, allowNull: false, unique: true },
    profession: { type: DataType.STRING, allowNull: false },
  },
  { timestamps: false },
)

export const Detail = sequelize.define(
  'detail',
  {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    detailName: { type: DataType.STRING, allowNull: false },
    detailNumber: { type: DataType.STRING, allowNull: false, unique: true },
  },
  { timestamps: false },
)

export const Operation = sequelize.define(
  'operation',
  {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    operationName: { type: DataType.STRING, allowNull: false },
    operationNumber: { type: DataType.STRING, allowNull: false },
    timeStandart: { type: DataType.STRING, allowNull: false },
    price: { type: DataType.STRING, allowNull: false },
    detailNumber: { type: DataType.STRING, allowNull: false },
    professionCode: { type: DataType.STRING, allowNull: false },
  },
  { timestamps: false },
)

export const WorkerOperation = sequelize.define(
  'worker_operation',
  {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    workerId: { type: DataType.INTEGER, allowNull: false },
    operationId: { type: DataType.STRING, allowNull: false },
    date: { type: DataType.STRING, allowNull: false },
    time: { type: DataType.STRING, allowNull: false },
  },
  { timestamps: false },
)

User.hasMany(Detail)
Detail.belongsTo(User)

User.hasMany(Worker)
Worker.belongsTo(User)

Detail.hasMany(Operation)
Operation.belongsTo(Detail)

Worker.belongsToMany(Operation, { through: WorkerOperation })
Operation.belongsToMany(Worker, { through: WorkerOperation })

export default {
  User,
  Worker,
  Detail,
  Operation,
  WorkerOperation,
}
