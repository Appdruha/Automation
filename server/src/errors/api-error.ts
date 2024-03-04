class ApiError extends Error {
  status: number
  code: string

  constructor(status: number, message: string, code?: string) {
    super()
    this.status = status
    this.message = message
    if (code) {
      this.code = code
    }
  }

  static unauthorized(message: string) {
    return new ApiError(401, message)
  }

  static badRequest(message: string, code?: string) {
    return new ApiError(400, message, code)
  }

  static notFound(message: string) {
    return new ApiError(404, message)
  }

  static internal(message: string) {
    return new ApiError(500, message)
  }
}

export default ApiError