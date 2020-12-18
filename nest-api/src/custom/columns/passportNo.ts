import { Column } from 'typeorm';

export const ColumnPassportNo = () => Column({
    type: 'char',
    length: 50,
    nullable: true,
});
