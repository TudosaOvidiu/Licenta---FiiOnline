export class LessonModel {
  public title: string;
  public files: FormData;
  public description: string;
  public date: Date;

  constructor() {
    this.title = '';
    this.files = new FormData();
    this.description = '';
    this.date = null;
  }
}
