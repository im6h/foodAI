import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class Pagination {
    @IsNumber()
    @IsOptional()
    @Transform(v => Number(v))
    @ApiProperty({ description: 'Số / trang', example: 10, required: false })
    size: number;

    @IsNumber()
    @IsOptional()
    @Transform(v => Number(v))
    @ApiProperty({ description: 'Trang', example: 1, required: false })
    page: number;
}
