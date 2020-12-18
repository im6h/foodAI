import { Column } from 'typeorm';

export const ColumnMarital = () => Column({
    type: 'varchar',
    length: 50,
    nullable: true,
});
