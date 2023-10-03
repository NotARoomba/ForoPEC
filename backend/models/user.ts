export default class User {
  constructor(
    public email: string,
    public name: string,
    public hasFood: boolean,
    public salon: string,
    public admin: boolean,
  ) {}
}
