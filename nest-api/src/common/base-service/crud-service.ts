import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

export class TypeOrmCustomeCrudService<T> extends TypeOrmCrudService<T> {
  protected getFieldWithAlias(field: string, sort: boolean = false) {
    const cols = field.split('.');
    // relation is alias
    switch (cols.length) {
      case 1:
        if (sort || this.alias[0] === '"') {
          return `${this.alias}.${field}`;
        }
        return `${this.alias}.${field}`;
      case 2:
        return field;
      default:
        return cols.slice(cols.length - 2, cols.length).join('.');
    }
  }
}
