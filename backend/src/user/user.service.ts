import * as bcrypt from 'bcrypt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto, UserSettingsDto } from 'src/dto/user';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Follows } from './follows.entity';
export const saltOrRounds = 10;

const setIsFollowing = async (
  followerId: number | undefined,
  followingId: number,
  repository: any,
): Promise<boolean> => {
  if (!followerId) {
    return false;
  }

  const follow = await repository.findOne({
    where: { followerId, followingId },
  });

  const isFollowing = follow ? true : false;
  return isFollowing;
};

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
      .where('email = :email', { email })
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

  async updateUser(id: number, data: UserSettingsDto) {
    const { password } = data;
    delete data.password;
    const user = await this.userRepository.findOne(id);
    const updated: User = Object.assign(user, data);

    if (password) {
      const hash = await bcrypt.hash(data.password, saltOrRounds);
      updated.password = hash;
    }

    const save = await this.userRepository.save(user);
    const { name, image } = save;
    return {
      user: { id, name, image },
    };
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async readUser(id: number, loginId: number) {
    const loginUser = await this.userRepository.findOne(loginId);
    const user = await this.userRepository.findOne(id);

    const followerId = loginUser?.id;
    const followingId = user.id;

    const isFollowing = await setIsFollowing(
      followerId,
      followingId,
      this.followsRepository,
    );

    user.isFollowing = isFollowing;
    user.isLoginUser = id == loginId;
    delete user.password;
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

    const isFollowing = await setIsFollowing(
      followerId,
      followingId,
      this.followsRepository,
    );

    followUser.isFollowing = isFollowing;
    return followUser;
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

    const isFollowing = await setIsFollowing(
      followerId,
      followingId,
      this.followsRepository,
    );

    followUser.isFollowing = isFollowing;
    return followUser;
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

  async findOne(email: string, password: string): Promise<User | string> {
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
}
