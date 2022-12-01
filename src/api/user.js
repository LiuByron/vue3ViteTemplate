import { post } from '@/utils/request';

export default class User {
  // 登录
  static async login(username, password) {
    return post('/login', {
      username,
      password,
    });
  }
}