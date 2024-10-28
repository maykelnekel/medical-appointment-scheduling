export class HttpError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // Chama o construtor da classe base Error
    this.statusCode = statusCode;

    // Ajusta o protótipo explicitamente
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
