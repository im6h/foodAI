import { Column } from 'typeorm';

export const ColumnLiteracy = () => Column({
    type: 'varchar',
    length: 100,
    nullable: true,
});
