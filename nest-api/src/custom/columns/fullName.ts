import { Column } from 'typeorm';

export const ColumnFullName = () => Column({
  type: 'varchar',
  length: 100,
});
