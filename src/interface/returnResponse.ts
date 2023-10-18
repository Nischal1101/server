interface ReturnResponse {
  status: "success" | "error";
  message: string;
  data: object[] | object;
}
export default ReturnResponse;
