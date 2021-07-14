import * as bcrypt from 'bcrypt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto } from 'src/dto/user';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Follows } from './follows.entity';
export const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follows)
    private readonly followsRepository: Repository<Follows>,
  ) {}

  async createUser(data: UserDto) {
    const { email, password, name } = data;

    const dup = await this.userRepository
      .createQueryBuilder()
      .where('name = :name', { name })
      .orWhere('email = :email', { email })
      .getOne();

    if (dup) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authentication failed',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // TODO: set entity
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.userRepository.save({ email, password: hash, name });
  }

  async updateUser(id: number, data: UserDto) {
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.userRepository.findOne(id);

    const updated: User = Object.assign(user, data);
    updated.password = hash;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async login(data: UserDto): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authentication failed',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const dbPassword = user.password;
    const isMatch = await bcrypt.compare(password, dbPassword);

    if (!isMatch) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.UNAUTHORIZED,
          error: 'Passwords do not match.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async follow(loginId: number, followId: number) {
    //TODO: validation共通にする
    if (loginId === followId) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplication error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const loginUser = await this.userRepository.findOne(loginId);
    const followUser = await this.userRepository.findOne(followId);

    if (!loginUser || !followUser) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const followerId = loginUser.id;
    const followingId = followUser.id;

    const follows = new Follows();
    follows.followerId = followerId;
    follows.followingId = followingId;
    const count = await this.followsRepository.count(follows);

    if (count === 0) {
      await this.followsRepository.save(follows);
    }

    return;
  }

  async unFollow(loginId: number, followId: number) {
    //TODO: validation共通にする
    if (loginId === followId) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplication error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const loginUser = await this.userRepository.findOne(loginId);
    const followUser = await this.userRepository.findOne(followId);

    if (!loginUser || !followUser) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const followerId = loginUser.id;
    const followingId = followUser.id;

    const follows = new Follows();
    follows.followerId = followerId;
    follows.followingId = followingId;

    const id = await this.followsRepository.findOne(follows);

    if (id) {
      await this.followsRepository.delete(id);
    }

    return;
  }

  async readFollow(loginId: number) {
    const follow = await this.userRepository
      .createQueryBuilder()
      .leftJoinAndSelect('follows', 'follows', 'follows.followingId = user.id')
      .where('follows.followerId = :followerId', { followerId: loginId })
      .getManyAndCount();

    const following = await this.userRepository
      .createQueryBuilder()
      .leftJoinAndSelect('follows', 'follows', 'follows.followerId = user.id')
      .where('follows.followingId = :followingId', { followingId: loginId })
      .getManyAndCount();

    return { follow, following };
  }
}
