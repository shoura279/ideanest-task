export class CreateResponse<T> {
  success: boolean;
  data: T | any;
}

export class SignInResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}
export class UpdateResponse<T> {
  success: boolean;
  data: T;
}

export class FindAllResponse<T> {
  success: boolean;
  data: T[];
}

export class FindOneResponse<T> {
  success: boolean;
  data: T;
}

export class RemoveResponse {
  success: boolean;
}
