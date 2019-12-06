import { Component, Input } from '@angular/core';
import { Courses } from '../../../models/Courses';
import { CourseActivity } from '../../../models/CourseActivity';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class CoursesComponent {

  @Input('courses') courses: Courses[];
  @Input('subtitle') subtitle: string;

  getNote(activity: CourseActivity) {
    if (!activity.note)
      return '';
    else
      return activity.note;
  }

  isFirstLast(first, last) {
    if (first)
      return 'first';
    if (last)
      return 'last';
  }

}