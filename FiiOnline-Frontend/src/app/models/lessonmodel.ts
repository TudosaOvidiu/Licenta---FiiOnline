export class LessonModel {
  public title: string;
  public files: FormData;
  public description: string;
  public type: string;

  constructor() {
    this.title = '';
    this.files = new FormData();
    this.description = '';
    this.type = '';
  }
}
