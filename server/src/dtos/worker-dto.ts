import Worker from '../db/models/worker.js'

class WorkerDto {
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