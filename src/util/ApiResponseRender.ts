import { Response } from "express";
import * as HttpStatus from "http-status-codes";

export class ApiResponseRender {

  constructor(protected response: Response) {
  }

  render(payload: any) {
    this.response.setHeader("Content-Type", "application/json");
    this.response.send(JSON.stringify(payload));
  }

  renderValidationError(payload: any) {
    this.response.status(HttpStatus.BAD_REQUEST);
    this.response.setHeader("Content-Type", "application/json");
    this.response.send(JSON.stringify(payload));
  }
}