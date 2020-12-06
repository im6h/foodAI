import { Column } from 'typeorm';

export const ColumnHouseType = () => Column({
    type: 'char',
    length: 20,
    nullable: true,
});
