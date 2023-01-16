export class ResponseResource {
    status: RequestStatus
    data: object | undefined

    constructor(status: RequestStatus, data: object | undefined) {
        this.status = status
        this.data = data
    }
}

export class RequestStatus {
    public code: number
    public message: string

    constructor(code: number, message: string) {
        this.code = code
        this.message = message
    }
}