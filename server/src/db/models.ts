import {DataType} from "sequelize-typescript";
const sequelize = require("./index")

const User = sequelize.define('user', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataType.STRING, unique: true, allowNull: false},
    password: {type: DataType.STRING, allowNull: false},
}, {timestamps: false})

const Employee = sequelize.define('employee', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataType.STRING, allowNull: false},
    personNumber: {type: DataType.STRING, allowNull: false, unique: true},
    profession: {type: DataType.STRING, allowNull: false},
}, {timestamps: false})

const Detail = sequelize.define('detail', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    detailName: {type: DataType.STRING, allowNull: false},
    detailNumber: {type: DataType.STRING, allowNull: false, unique: true},
}, {timestamps: false})

const Operation = sequelize.define('operation', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    operationName: {type: DataType.STRING, allowNull: false},
    operationNumber: {type: DataType.STRING, allowNull: false},
    timeStandart: {type: DataType.STRING, allowNull: false},
    price: {type: DataType.STRING, allowNull: false},
    detailNumber: {type: DataType.STRING, allowNull: false},
    professionCode: {type: DataType.STRING, allowNull: false},
}, {timestamps: false})

const EmployeeOperation = sequelize.define('employee_operation', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    employeeId: {type: DataType.INTEGER, allowNull: false},
    operationId: {type: DataType.STRING, allowNull: false},
    date: {type: DataType.STRING, allowNull: false},
    time: {type: DataType.STRING, allowNull: false},
}, {timestamps: false})

User.hasMany(Detail)
Detail.belongsTo(User)

User.hasMany(Employee)
Employee.belongsTo(User)

Detail.hasMany(Operation)
Operation.belongsTo(Detail)

Employee.belongsToMany(Operation, {through: EmployeeOperation})
Operation.belongsToMany(Employee, {through: EmployeeOperation})

module.exports = {
    User,
    Employee,
    Detail,
    Operation,
    EmployeeOperation
}



