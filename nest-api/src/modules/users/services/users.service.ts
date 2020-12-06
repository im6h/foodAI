import { Injectable, BadRequestException } from '@nestjs/common';
// import {
//   paginate,
//   Pagination,
//   IPaginationOptions,
// } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCustomeCrudService } from '@/common/base-service/crud-service';
import { MailerService } from '@nest-modules/mailer';
import { UserEntity } from '../entities/user.entity';
import { Repository, getConnection, getRepository } from 'typeorm';
import { UserBasicEntity } from '../../../modules/auth/basic/entities/basic.entity';
import { UserListQueryClient } from '../dto/user.list.dto';
import { UpdateStatusUser } from '../dto/user.updateStatus.dto';
import { RoleEntity } from '@/modules/roles/entities/role.entity';
import { UpdateUser } from '../dto/user.update.dto';
import { makeRandomNumber } from '../../../utils/string';
import { checkRole } from '../../../utils/checkRole';
import { calulatePagination } from '../../../utils/calculatePagination';
import { Pagination } from '../../../custom/dtos/pagination';
import * as bcrypt from 'bcrypt';
import { CreateUser } from '../dto/user.create.dto';
import { ErrorCode, AppConfig } from '@/common/constants';
import { UserIdentity } from '@/modules/auth/auth.decorator';
import { Config } from '@/config';

@Injectable()
export class UsersService extends TypeOrmCustomeCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserBasicEntity)
    private basicRepository: Repository<UserBasicEntity>,

    private readonly mailerService: MailerService,
  ) {
    super(repository);
  }

  async create(payload: CreateUser) {
    // validate username
    const user = await this.basicRepository.findOne({
      username: payload.username,
    });
    if (user) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'username',
          children: [],
          constraints: {
            username: ErrorCode.USERNAME_EXISTS,
          },
        },
      ]);
    }

    const userEmail = await this.basicRepository.findOne({
      email: payload.email,
    });
    if (userEmail) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'email',
          children: [],
          constraints: {
            email: ErrorCode.EMAIL_EXISTS,
          },
        },
      ]);
    }
    const userPhone = await this.findByPhone(payload.phoneNumber);
    if (userPhone) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'phoneNumber',
          children: [],
          constraints: {
            email: ErrorCode.PHONE_EXISTS,
          },
        },
      ]);
    }

    return await getConnection().transaction(async manager => {
      const codeActive = makeRandomNumber(6);
      const roles =
        payload.roles && payload.roles.length
          ? await this.roleRepository
              .createQueryBuilder('roles')
              .where('roles.id IN (:roles)', { roles: payload.roles })
              .getMany()
          : [];
      // const role = roles[0];
      const typeRoles = roles.map(role => role.typeRole.toString());
      const profile = this.repository.create({
        ...payload,
        roles,
        codeActive,
      });

      const newUser = await manager.save(profile);
      const basic = manager.create(UserBasicEntity, {
        ...payload,
        // userId: newUser.id,
      });

      const userSave = await manager.save(basic);
      // const { code } = roles[0];
      if (typeRoles.includes(AppConfig.ROLE_CODE.CUSTOMER)) {
        /* tslint:disable */
        this.mailerService
          .sendMail({
            to: payload.email, // list of receivers
            from: Config.EMAIL_FROM, // sender address
            subject: 'Kích hoạt tài khoản', // Subject line
            text: 'welcome', // plaintext body
            html: `Click vào <a href="https://${
              process.env.FRONTEND_DOMAIN
            }/dang-ky-otp?email=${userSave.email}&userid=${
              1 // userSave.userId
            }">đây để kích hoạt code</a>.<br>
            Code kích hoạt của bạn là <b>${codeActive}</b><br> `, // HTML body content
          })
          .then(() => {})
          .catch(e => {
            console.log(e);
          });
        /* tslint:enable */
      }
      return { ...userSave };
    });
  }

  async getManyUserByRole(pagination: Pagination, query: UserListQueryClient) {
    const { queries } = query;
    const [limit, offset] = calulatePagination(
      pagination.size,
      pagination.page,
    );
    const newQuery = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .innerJoinAndSelect('user.basic', 'basic')
      .andWhere('user.status = 1');
    if (queries) {
      // newQuery.andWhere('user.lastName like :query', {
      //   query: '%' + queries + '%',
      // });
      newQuery.andWhere(
        `
        ((CONCAT(user.lastName, ' ', user.firstName) like :query) OR
        user.phoneNumber like :query OR
        basic.email like :query)
      `,
        {
          query: '%' + queries + '%',
        },
      );
    }
    const [items, total] = await newQuery
      .limit(limit)
      .offset(offset)
      .addOrderBy('user.id', 'DESC')
      .getManyAndCount();
    const pageCount = limit && total ? Math.ceil(total / limit) : 0;
    return {
      items,
      total,
      pageCount,
      count: items.length,
      page: offset / limit + 1,
    };
  }

  async getManyUser(
    pagination: Pagination,
    query: UserListQueryClient,
    identity: UserIdentity,
  ) {
    const { queries, status, company, type } = query;
    const [limit, offset] = calulatePagination(
      pagination.size,
      pagination.page,
    );
    const { foundUser } = await checkRole(identity);

    const createQuery = this.repository
      .createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.basic',
        UserBasicEntity,
        'basic',
        'basic.userId =  user.id',
      )
      .leftJoinAndSelect('user.roles', 'roles');

    if (queries) {
      createQuery.andWhere(
        'user.phoneNumber like :query OR basic.email like :query',
        {
          query: '%' + queries + '%',
        },
      );
    }

    if (status) {
      createQuery.andWhere('user.status= :status', { status });
    }

    if (type) {
      createQuery.andWhere('roles.typeRole = :type', { type });
    }

    const [users, total] = await createQuery
      .select(['user'])
      .limit(limit)
      .offset(offset)
      .groupBy('user.id')
      .addOrderBy('user.id', 'DESC')
      .getManyAndCount();
    let items = users;
    if (users.length > 0) {
      const userIds = users.map(user => user.id);
      items = await this.repository
        .createQueryBuilder('user')
        .leftJoinAndMapOne(
          'user.basic',
          UserBasicEntity,
          'basic',
          'basic.userId =  user.id',
        )
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.id IN (:userIds)', { userIds })
        .addOrderBy('user.id', 'DESC')
        .getMany();
    }

    const pageCount = limit && total ? Math.ceil(total / limit) : 0;
    return {
      items,
      total,
      pageCount,
      count: items.length,
      page: offset / limit + 1,
      roles: foundUser.roles,
    };
  }

  async deleteUser(id: number) {
    const foundUser = await this.repository.findOne(id);
    if (!foundUser) {
      throw new BadRequestException(ErrorCode.USER_NOT_EXISTS);
    }
    return await getConnection().transaction(async manager => {
      await this.repository.delete(id);
      await manager.delete(UserBasicEntity, { userId: id });
      return;
    });
  }

  async findByUserId(userId: number): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: {
        id: userId,
      },
    });
  }

  updateById(userId: number, update: UserEntity): Promise<UserEntity> {
    this.repository.update(userId, update);
    return this.repository.findOne({
      where: {
        id: userId,
      },
    });
  }

  findByPhone(phoneNumber: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: {
        phoneNumber,
      },
    });
  }

  async approve(id: number, body: UpdateStatusUser) {
    // const userFound = await this.repository.findOne({ id });
    // if (!userFound) {
    //   throw new BadRequestException(ErrorCode.USER_NOT_EXISTS);
    // }
    // const userBasic = await this.basicRepository.findOne({ userId: id });
    // await this.repository.update(
    //   { id },
    //   {
    //     status: body.status,
    //     reason: body.reason,
    //   },
    // );

    // const message = {
    //   0: 'Tài khoản của bạn đang được chờ xác nhận',
    //   1: 'Chào mừng đến với fina. Tài khoản của bạn đã được phê duyệt.',
    //   2: 'Tài khoản của bạn bị từ chối xác nhận',
    //   3: 'Tài khoản của bạn đã bị khóa',
    // };
    // if (userBasic && userBasic.email) {
    //   /* tslint:disable */
    //   this.mailerService
    //     .sendMail({
    //       to: userBasic.email, // list of receivers
    //       from: 'no-reply@fina.com.vn', // sender address
    //       subject: message[body.status], // Subject line
    //       text: 'welcome', // plaintext body
    //       html: `${message[body.status]}. Lý do: ${
    //         body.reason ? body.reason : 'Không có'
    //       }`, // HTML body content
    //     })
    //     .then(() => {})
    //     .catch(e => {
    //       console.log(e);
    //     });
    //   /* tslint:enable */
    // }
    return true;
  }

  async update(id: number, body: UpdateUser) {
    const userFound = await this.repository.findOne({ id });
    if (!userFound) {
      throw new BadRequestException(ErrorCode.USER_NOT_EXISTS);
    }
    const roles =
      body.roles && body.roles.length
        ? await this.roleRepository
            .createQueryBuilder('roles')
            .where('roles.id IN (:roles)', { roles: body.roles })
            .getMany()
        : [];
    return await getConnection().transaction(async manager => {
      const fixedPost = {
        ...userFound,
        ...body,
        roles,
      };
      const updateUser = await this.repository.save(fixedPost);
      // if (body.password && body.password.length >= 8) {
      //   const userBasic = await this.basicRepository.findOne({
      //     userId: updateUser.id,
      //   });
      //   this.basicRepository.save({
      //     ...userBasic,
      //     password: bcrypt.hashSync(body.password, 12),
      //   });
      // }
      if (body.roles.includes(userFound.defaultRole)) {
        await this.repository.update({ id }, { defaultRole: null });
      }
      // const role = roles[0];
      return updateUser;
    });
  }

  async exportExcel(query, identity: UserIdentity) {
    const { queries, status, type } = query;

    const createQuery = this.repository
      .createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.basic',
        UserBasicEntity,
        'basic',
        'basic.userId =  user.id',
      )
      .leftJoinAndSelect('user.roles', 'roles');

    let ids: any;
    try {
      ids = JSON.parse(query.ids);
      ids = Array.isArray(ids) ? ids : [];
    } catch (e) {
      ids = [];
    }
    if (queries) {
      createQuery.andWhere(
        'user.phoneNumber like :query OR basic.email like :query',
        {
          query: '%' + queries + '%',
        },
      );
    }
    if (status) {
      createQuery.andWhere('user.status= :status', { status });
    }
    if (type) {
      createQuery.andWhere('roles.typeRole = :type', { type });
    }

    if (ids.length > 0) {
      createQuery.andWhere('user.id IN (:ids)', { ids });
    }

    const items = await createQuery.addOrderBy('user.id', 'DESC').getMany();
    return items;
  }
}
