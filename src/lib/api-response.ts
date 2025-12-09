export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public message?: string,
    public error?: string
  ) { }

  static success<T>(data: T, message?: string): ApiResponse<T> {
    return new ApiResponse(true, data, message);
  }

  static error(error: string, message?: string): ApiResponse<null> {
    return new ApiResponse(false, null, message, error);
  }
}
