import { Column } from 'typeorm';

export const ColumnDepartment = () => Column({
    type: 'varchar',
    length: 20,
    nullable: true,
});
