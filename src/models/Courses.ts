import { CourseActivity } from './CourseActivity';

export class Courses {
  public time: string;
  public monday: CourseActivity[];
  public tuesday: CourseActivity[];
  public wednesday: CourseActivity[];
  public thursday: CourseActivity[];
  public friday: CourseActivity[];

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.time && (this.time = obj.time);
      obj.monday && (this.monday = obj.monday);
      obj.tuesday && (this.tuesday = obj.tuesday);
      obj.wednesday && (this.wednesday = obj.wednesday);
      obj.thursday && (this.thursday = obj.thursday);
      obj.friday && (this.friday = obj.friday);
    }
  }
}