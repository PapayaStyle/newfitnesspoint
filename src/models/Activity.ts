export class Activity {
  // public id: string;
  public link: string;
  public image: string;
  public name: string;
  public description: string;
  public video: string;
  public show: number;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      // obj.id && (this.id = obj.id);
      obj.link && (this.link = obj.link);
      obj.image && (this.image = obj.image);
      obj.name && (this.name = obj.name);
      obj.description && (this.description = obj.description);
      obj.video && (this.video = obj.video);
      obj.show && (this.show = obj.show);
    }
  }
}