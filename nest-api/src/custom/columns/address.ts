import { Column } from 'typeorm';

export const ColumnAddress = () => Column({
  type: 'varchar',
  length: 150,
  nullable: true,
});
