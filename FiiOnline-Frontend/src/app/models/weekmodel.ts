export class WeekModel {
  public title: string;
  public date: Date;
  public weekNr: number;
  public description: string;
  public courseId: string;

  constructor() {
    this.title = '';
    this.date = new Date();
    this.weekNr = null;
    this.description = '';
    this.courseId = '';
  }
}
