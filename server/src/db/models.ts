// import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
// import sequelize from './index.js'
// import { UserAttributes, UserCreationAttributes } from "../types/user.js";
//
//
//
// @Table({timestamps: false})
// export class Worker extends Model<UserAttributes, UserCreationAttributes> {
//   @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
//   id: number
//
//   @Column({type: DataType.STRING, allowNull: false})
//   name: string
//
//   @Column({type: DataType.STRING, allowNull: false, unique: true})
//   personNumber: string
//
//   @Column({type: DataType.STRING, allowNull: false})
//   profession: string
// }
//
// @Table({timestamps: false})
// export class Detail extends Model<UserAttributes, UserCreationAttributes> {
//   @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
//   id: number
//
//   @Column({type: DataType.STRING, allowNull: false})
//   detailName: string
//
//   @Column({type: DataType.STRING, allowNull: false, unique: true})
//   detailNumber: string
//
// }
//
// @Table({timestamps: false})
// export class Operation extends Model<UserAttributes, UserCreationAttributes> {
//   @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
//   id: number
//
//   @Column({type: DataType.STRING, allowNull: false})
//   operationName: string
//
//   @Column({type: DataType.STRING, allowNull: false})
//   operationNumber: string
//
//   @Column({type: DataType.STRING, allowNull: false})
//   timeStandart: string
//
//   @Column({type: DataType.STRING, allowNull: false})
//   price: string
//
//   @Column({type: DataType.STRING, allowNull: false})
//   professionCode: string
//
//   @Column({type: DataType.STRING, allowNull: false})
//   detailNumber: string
// }
//
// @Table({timestamps: false})
// export class WorkerOperation extends Model<UserAttributes, UserCreationAttributes> {
//   @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
//   id: number
//
//   @Column({type: DataType.INTEGER, allowNull: false})
//   workerId: number
//
//   @Column({type: DataType.STRING, allowNull: false})
//   operationId: string
//
//   @Column({type: DataType.DATEONLY, allowNull: false})
//   date: Date
//
//   @Column({type: DataType.STRING, allowNull: false})
//   time: string
//
// }
//
// User.hasMany(Detail)
// Detail.belongsTo(User)
//
// User.hasMany(Worker)
// Worker.belongsTo(User)
//
// Detail.hasMany(Operation)
// Operation.belongsTo(Detail)
//
// Worker.belongsToMany(Operation, { through: WorkerOperation })
// Operation.belongsToMany(Worker, { through: WorkerOperation })
//
// export default {
//   User,
//   Worker,
//   Detail,
//   Operation,
//   WorkerOperation,
// }
