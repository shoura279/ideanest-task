import { SignupDTO } from '../dto';
import { User } from '../entity';
import * as bcrypt from 'bcrypt';
export class AuthFactoryService {
  createUser(signupDTO: SignupDTO) {
    const newUser = new User();

    newUser.name = signupDTO.name;
    newUser.email = signupDTO.email;
    newUser.password = bcrypt.hashSync(signupDTO.password, 8);

    return newUser;
  }
}
