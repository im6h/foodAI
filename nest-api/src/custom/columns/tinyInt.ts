import { Column } from 'typeorm';

export const ColumnTinyInt = () => Column({
  type: 'tinyint',
  default: 0,
  nullable: true,
});
