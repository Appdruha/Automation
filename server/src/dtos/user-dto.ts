import User from "../db/models/user.js";

class UserDto {
  email;
  id;

  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
  }
}

export default UserDto