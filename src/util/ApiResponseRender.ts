import { Response } from "express";
import * as HttpStatus from "http-status-codes";

export class ApiResponseRender {

  constructor(protected response: Response) {
  }

  render(payload: any) {
    this.response
      .header("Content-Type", "application/json")
      .json(payload);
  }

  renderValidationError(payload: any) {
    this.response.status(HttpStatus.BAD_REQUEST)
      .header("Content-Type", "application/json")
      .json(payload);
  }
}