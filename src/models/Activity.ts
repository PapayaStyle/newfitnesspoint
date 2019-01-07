export class Activity {
  public id: number;
  public link: string;
  public image: string;
  public preview: string;
  public title: string;
  public desc: string;
  public video: string;
  public show: number;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.link && (this.link = obj.link);
      obj.image && (this.image = obj.image);
      obj.preview && (this.preview = obj.preview);
      obj.title && (this.title = obj.title);
      obj.desc && (this.desc = obj.desc);
      obj.video && (this.video = obj.video);
      obj.show && (this.show = obj.show);
    }
  }
}