import { Column } from 'typeorm';

export const ColumnIdetityNo = () => Column({
    type: 'char',
    length: 20,
    nullable: true,
});
