import { Column } from 'typeorm';

export const ColumnMoney = () => Column({
    type: 'decimal',
    precision: 15,
    scale: 0,
    nullable: true,
});
