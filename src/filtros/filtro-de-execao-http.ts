import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class FiltroDeExecaoHttp implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse<Response>();

    const status = exception.getStatus();
    const body = exception.getResponse();

    resposta.status(status).json(body);
  }
}
