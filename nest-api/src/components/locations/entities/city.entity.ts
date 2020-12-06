import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('LocationCity')
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '84' })
  @Column()
  countryId: string;

  @ApiProperty({ example: '01' })
  @Column({ default: null, nullable: true })
  stateId: string;

  @ApiProperty({ example: '01' })
  @Column()
  code: string;

  @ApiProperty({ example: 'ha-noi' })
  @Column()
  slug: string;

  @ApiProperty({ example: 'Hà Nội' })
  @Column()
  name: string;

  @ApiProperty({ example: 'thanh-pho' })
  @Column()
  type: string;

  @ApiProperty({ example: 'Thành Phố Hà Nội' })
  @Column({
    default: 0,
  })
  nameWithType: string;

  @ApiProperty({ example: 1 })
  @Column()
  order: number;
}
