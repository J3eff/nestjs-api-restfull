import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HashearSenhaPipe implements PipeTransform {
  transform(senha: string) {
    return senha + 'abcdef';
  }
}
