import { Column } from 'typeorm';

export const ColumnCustomerId = () => Column({
    type: 'char',
    length: 12,
    nullable: true,
});
