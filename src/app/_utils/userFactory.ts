import { User } from "../_models/user.model";

export function userFactory(data: any): User{
  let user = new User(
    data.email,
    data.nome,
    data.senha,
    data.tipo || null
  )
  return user;
}
