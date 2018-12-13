export class CourseActivity {
  public id: number;
  public name: string;
  public note: string;
  public link: string;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.name && (this.name = obj.name);
      obj.note && (this.note = obj.note);
      obj.link && (this.link = obj.link);
    }
  }
}