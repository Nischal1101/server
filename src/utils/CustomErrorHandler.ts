class CustomErrorHandler extends Error {
  statusCode: number;

  constructor(msg: string, statusCode: number) {
    super();
    this.statusCode = statusCode;
    this.message = msg;
  }
}
export default CustomErrorHandler;
