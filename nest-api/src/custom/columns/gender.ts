import { Column } from 'typeorm';

export const ColumnGender = () => Column({
    type: 'varchar',
    length: 5,
    nullable: true,
});
