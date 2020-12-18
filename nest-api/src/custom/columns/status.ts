
import { Column } from 'typeorm';

export const ColumnStatus = () => Column({
    type: 'tinyint',
    nullable: true,
    default: 0,
});
