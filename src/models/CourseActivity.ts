import { Activity } from './Activity';

export class CourseActivity {
  // public id: number;
  // public name: string;
  public activity: Activity;
  public note: string;
  public link: string;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      // obj.id && (this.id = obj.id);
      obj.activity && (this.activity = obj.activity);
      obj.note && (this.note = obj.note);
      obj.link && (this.link = obj.link);
    }
  }
}