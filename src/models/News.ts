export class News {
  public id: number;
  public title: string;
  public desc: string;
  public image: string;
  public video: string;
  public show: number;
  public date: string;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.title && (this.title = obj.title);
      obj.desc && (this.desc = obj.desc);
      obj.image && (this.image = obj.image);
      obj.video && (this.video = obj.video);
      obj.show && (this.show = obj.show);
      obj.date && (this.date = obj.date);
    }
  }
    /*
    constructor(id: number, title: string, desc: string, image: string, 
        video: string, show: number, date: string) {
        this.id =id;
        this.title = title;
        this.desc = desc;
        this.image = image;
        this.video = video;
        this.show = show;
        this.date = date;
    }
  */
}