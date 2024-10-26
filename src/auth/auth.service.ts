import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/model/user/user.repository';
import { User } from './entity';
import { SignInDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async handleSignup(user: User) {
    const userExist = await this.userRepository.getOne({ email: user.email });
    if (userExist) {
      throw new ConflictException('user already exist');
    }
    const createdUser = await this.userRepository.create(user);
    if (!createdUser) {
      throw new BadGatewayException('fail to create user');
    }
    return createdUser;
  }

  async signIn(signInDTO: SignInDTO) {
    const userExist = await this.userRepository.getOne({
      email: signInDTO.email,
    });

    if (!userExist) {
      throw new NotFoundException('invalid credential');
    }
    // check password
    const match = bcrypt.compareSync(signInDTO.password, userExist.password);
    if (!match) {
      throw new BadRequestException('invalid credential');
    }
    // generate tokens
    const accessToken = this.jwtService.sign(
      { _id: userExist._id },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    const refreshToken = this.jwtService.sign(
      { _id: userExist._id },
      { secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );
    return {
      message: 'login successfully',
      refresh_token: refreshToken,
      access_token: accessToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      if (!decoded?._id) {
        throw new BadRequestException('invalid token payload');
      }
      const accessToken = this.jwtService.sign(
        { _id: decoded._id },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      const newRefreshToken = this.jwtService.sign(
        { _id: decoded._id },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );
      return {
        message: 'refreshToken successfully',
        access_token: accessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
