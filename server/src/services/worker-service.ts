import XLSX from 'xlsx'
import Worker from '../db/models/worker.js'
import { where } from 'sequelize'
import { WorkerData, WorkerFromSheet } from '../types/worker.js'
import ApiError from '../errors/api-error.js'
import {
  birthdayRegExp,
  defaultBirthdayValue,
  defaultProfessionValue,
  nameRegExp,
  personNumberRegExp, professionRegExp
} from "../utils/consts.js";

class WorkerService {
  async create(file: Buffer, userId: number) {
    const workbook = XLSX.read(file)
    const sheetName = workbook.SheetNames[0]
    const workersDataFromSheet: WorkerFromSheet[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

    const workers = await Worker.findAll({ where: { userId } })
    console.log(workers)

    console.log(this.validateWorkersData(workersDataFromSheet))
    return this.validateWorkersData(workersDataFromSheet)
  }

  validateWorkersData(workersData: WorkerFromSheet[]) {
    return workersData.map((workerData, index): WorkerData => {
      const values = Object.values(workerData)

      const findValueWithRegExp = (array: string[], regExp: string) => {
        return array.find((value) => {
          return new RegExp(regExp).test(value)
        })
      }

      const workerNumber = findValueWithRegExp(values, personNumberRegExp)
      if (!workerNumber) {
        throw ApiError.badRequest(`Не найден табельный номер в строке ${index + 2}`)
      }

      const workerName = findValueWithRegExp(values, nameRegExp)
      if (!workerName) {
        throw ApiError.badRequest(`Не найдены или некорректно указаны ФИО в строке ${index + 2}`)
      }

      const workerBirthday = findValueWithRegExp(values, birthdayRegExp) || defaultBirthdayValue

      const workerProfession = findValueWithRegExp(values, professionRegExp) || defaultProfessionValue

      return {
        name: workerName,
        personNumber: workerNumber,
        birthday: new Date(workerBirthday),
        profession: workerProfession
      }
    })
  }
}

export default new WorkerService()
