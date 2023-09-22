export default class User {
  constructor(
    public number: string,
    public name: string,
    public hasFood: boolean,
    public salon: string,
    public admin: boolean,
  ) {}
}
