import Worker from '../db/models/worker.js'
import { WorkerData } from '../types/worker.js'

class WorkerDto implements WorkerData{
  name: string
  personNumber: string
  birthday: Date
  profession: string

  constructor(model: Worker) {
    this.name = model.name
    this.personNumber = model.personNumber
    this.birthday = model.birthday
    this.profession = model.profession
  }
}

export default WorkerDto