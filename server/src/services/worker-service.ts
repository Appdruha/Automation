import XLSX from 'xlsx'
import Worker from '../db/models/worker.js'
import { where } from 'sequelize'
import { WorkerData, WorkerDataFromSheet } from '../types/worker.js'
import ApiError from '../errors/api-error.js'
import {
  birthdayRegExp,
  defaultBirthdayValue,
  defaultProfessionValue,
  workerNumberLength,
  workersSheetColumnNames,
} from '../utils/consts.js'
import WorkerDto from '../dtos/worker-dto.js'

class WorkerService {
  async getAll(userId: number) {
    const workers = await Worker.findAll({ where: { userId } })
    return workers.map((worker) => new WorkerDto(worker))
  }

  async edit(workerData: WorkerData, userId: number) {
    const worker = await Worker.findOne({
      where: { userId, personNumber: workerData.personNumber },
    })

    if (worker) {
      worker.name = workerData.name
      worker.birthday = workerData.birthday
      worker.profession = workerData.profession
    } else {
      throw ApiError.badRequest('Некорректный табельный номер')
    }
    const newWorkerData = await worker.save()

    return new WorkerDto(newWorkerData)
  }

  async remove(personNumber: string, userId: number) {
    return Worker.destroy({ where: { userId, personNumber } })
  }

  async create(workerData: WorkerData, userId: number) {
    if (workerData.personNumber.length !== workerNumberLength) {
      throw ApiError.badRequest('Некорректный табельный номер')
    }

    const candidate = await Worker.findOne({
      where: { personNumber: workerData.personNumber, userId },
    })
    if (candidate) {
      throw ApiError.badRequest('Такой табельный номер уже существует')
    }

    const worker = await Worker.create({ ...workerData, userId })

    return new WorkerDto(worker)
  }

  async createWithFile(file: Buffer, userId: number) {
    const workbook = XLSX.read(file)
    const workbookWithColumnNames = XLSX.read(file, { sheetRows: 1 })
    const sheetName = workbook.SheetNames[0]
    const workerDataKeys = XLSX.utils
      .sheet_to_csv(workbookWithColumnNames.Sheets[sheetName])
      .split(',')

    workerDataKeys.forEach((key) => {
      if (!workersSheetColumnNames.includes(key)) {
        throw ApiError.badRequest('Некорректные названия столбоцов в файле')
      }
    })

    const workersDataFromSheet: WorkerDataFromSheet[] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName],
    )

    const validatedWorkers = this.validateWorkersData(workersDataFromSheet)

    const existingWorkers = await Worker.findAll({ where: { userId } })

    const workers = await Promise.all(
      validatedWorkers.map((validatedWorker) => {
        const existingWorker = existingWorkers.find((obj) => {
          return obj.personNumber === validatedWorker.personNumber
        })

        if (!existingWorker) {
          return Worker.create({ ...validatedWorker, userId })
        }

        return existingWorker
      }),
    )
    return workers.map((worker) => new WorkerDto(worker))
  }

  validateWorkersData(workersData: WorkerDataFromSheet[]) {
    return workersData.map((workerData, index): WorkerData => {
      const workerNumber = workerData['Табельный номер']
      if (workerNumber.length !== workerNumberLength) {
        throw ApiError.badRequest(`Некорректный табельный номер в строке ${index + 2}`)
      }

      const workerName = workerData['ФИО']
      const workerProfession = workerData['Профессия'] || defaultProfessionValue

      let workerBirthday = workerData['Дата рождения']
      if (workerBirthday && new RegExp(birthdayRegExp).test(workerBirthday)) {
        workerBirthday = workerBirthday.split(workerBirthday[2]).join('.')
      } else {
        workerBirthday = defaultBirthdayValue
      }

      return {
        personNumber: workerNumber,
        name: workerName,
        birthday: new Date(workerBirthday),
        profession: workerProfession,
      }
    })
  }
}

export default new WorkerService()
