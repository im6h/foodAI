import { Column } from 'typeorm';

export const ColumnCompany = () => Column({
    type: 'varchar',
    length: 100,
    nullable: true,
});
