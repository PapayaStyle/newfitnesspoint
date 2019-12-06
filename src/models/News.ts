export class News {
  public id: number;
  public title: string;
  public description: string;
  public image: string;
  public video: string;
  public show: number;
  public date: string;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.title && (this.title = obj.title);
      obj.description && (this.description = obj.description);
      obj.image && (this.image = obj.image);
      obj.video && (this.video = obj.video);
      obj.show && (this.show = obj.show);
      obj.date && (this.date = obj.date);
    }
  }
}