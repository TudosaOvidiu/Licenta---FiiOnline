export class UserModel {
  public userName: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public confirmPassword: string;
  public email: string;
  public year: string;
  public semester: number;
  public role: string;
  public imageURL: string;

  constructor() {
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.year = '';
    this.semester = null;
    this.role = '';
    this.imageURL = '';
  }
}
