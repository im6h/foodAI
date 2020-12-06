import { Column } from 'typeorm';

export const ColumnEmail = () => Column({
  type: 'varchar',
  nullable: true,
  length: 50,
});
