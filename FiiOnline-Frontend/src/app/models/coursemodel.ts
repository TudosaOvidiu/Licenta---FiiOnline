export class CourseModel {
  public name: string;
  public description: string;
  public year: number;
  public semester: number;
  public professorsGUIDs: Array<string>;

  constructor() {
    this.name = '';
    this.description = '';
    this.year = null;
    this.semester = null;
    this.professorsGUIDs = new Array();
  }

}
