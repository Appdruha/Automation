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
  personNumberRegExp,
} from '../utils/consts.js'
import WorkerDto from "../dtos/worker-dto.js";

class WorkerService {
  async create(file: Buffer, userId: number) {
    const workbook = XLSX.read(file)
    const sheetName = workbook.SheetNames[0]
    const workersDataFromSheet: WorkerFromSheet[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    const validatedWorkers = this.validateWorkersData(workersDataFromSheet)

    const workers = await Promise.all(validatedWorkers.map( (validatedWorker) => {
      return Worker.create({...validatedWorker, userId})
    }))

    return workers.map(worker => new WorkerDto(worker))
  }

  validateWorkersData(workersData: WorkerFromSheet[]) {
    return workersData.map((workerData, index): WorkerData => {
      let values = Object.values(workerData)

      if (values.length > 4) {
        throw ApiError.badRequest(`Строка ${index + 2} имеет лишние значения`)
      }

      const findValueWithRegExp = (array: string[], regExp: string) => {
        const someValue = array.find((value) => {
          return new RegExp(regExp).test(value)
        })

        if (someValue) {
          values = values.filter((value) => value != someValue)
        }

        return someValue
      }

      const workerNumber = findValueWithRegExp(values, personNumberRegExp)
      if (!workerNumber) {
        throw ApiError.badRequest(`Не найден табельный номер в строке ${index + 2}`)
      }

      const workerName = findValueWithRegExp(values, nameRegExp)
      if (!workerName) {
        throw ApiError.badRequest(`Не найдено или некорректно указано ФИО в строке ${index + 2}`)
      }

      const workerBirthday = findValueWithRegExp(values, birthdayRegExp) || defaultBirthdayValue

      const workerProfession = values[0] || defaultProfessionValue

      return {
        name: workerName,
        personNumber: workerNumber,
        birthday: new Date(workerBirthday),
        profession: workerProfession,
      }
    })
  }
}

export default new WorkerService()
