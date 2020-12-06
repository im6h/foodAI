import { Column } from 'typeorm';

export const ColumnPlace = () => Column({
    type: 'char',
    length: 50,
    nullable: true,
});
