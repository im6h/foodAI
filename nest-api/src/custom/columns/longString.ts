import { Column } from 'typeorm';

export const ColumnLongString = () => Column({
  type: 'varchar',
  length: 500,
  nullable: true,
});
