import Worker from '../db/models/worker.js'

export interface WorkerDataFromSheet {
  'Табельный номер': string
  'ФИО': string
  'Дата рождения'?: string
  'Профессия'?: string
}

export interface WorkerData {
  name: string
  personNumber: string
  birthday: Date
  profession: string
}