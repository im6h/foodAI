import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('LocationProvince')
export class ProvinceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '84' })
  @Column()
  countryId: string;

  @ApiProperty({ example: '01' })
  @Column()
  code: string;

  @ApiProperty({ example: '01' })
  @Column()
  cityCode: string;

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
  @Column({ default: null, nullable: true })
  nameWithType: string;

  @ApiProperty({ example: 'An Phú, An Giang' })
  @Column({ default: null, nullable: true })
  path: string;

  @ApiProperty({ example: 'Huyện An Phú, Tỉnh An Giang' })
  @Column({ default: null, nullable: true })
  pathWithType: string;
}
