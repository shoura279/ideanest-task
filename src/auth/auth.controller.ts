import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateResponse, SignInResponse } from 'src/common/dto/response.dto';
import { User } from 'src/model/user/user.schema';
import { AuthFactoryService } from './factory';
import { SignInDTO, SignupDTO } from './dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private authFactoryService: AuthFactoryService,
  ) {}

  @Post('signup')
  public async signup(@Body() signupDTO: SignupDTO) {
    const createUserResponse = new CreateResponse<User>();
    try {
      const user = this.authFactoryService.createUser(signupDTO);
      const createdUser = await this.authService.handleSignup(user);
      createUserResponse.data = createdUser;
      createUserResponse.success = true;
    } catch (error) {
      createUserResponse.success = false;
      throw error;
    }
    return createUserResponse;
  }
  @Post('signin')
  public async signIn(@Body() signInDTO: SignInDTO) {
    const signInResponse = new SignInResponse();
    try {
      const result = await this.authService.signIn(signInDTO);
      signInResponse.message = result.message;
      signInResponse.access_token = result.access_token;
      signInResponse.refresh_token = result.refresh_token;
    } catch (error) {
      throw error;
    }
    return signInResponse;
  }

  public async refreshToken(@Body('refresh_token') refreshToken: string) {
    const refreshTokenResponse = new SignInResponse();
    try {
      const result = await this.authService.refreshToken(refreshToken);
      refreshTokenResponse.message = result.message;
      refreshTokenResponse.access_token = result.access_token;
      refreshTokenResponse.refresh_token = result.refresh_token;
    } catch (error) {
      throw error;
    }
    return refreshTokenResponse;
  }
}
