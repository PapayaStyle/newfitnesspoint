export class Gallery {
  public id: number;
  public thumbnail: string;
  public preview: string;
  public image: string;
  public show: number;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.thumbnail && (this.thumbnail = obj.thumbnail);
      obj.preview && (this.preview = obj.preview);
      obj.image && (this.image = obj.image);
      obj.show && (this.show = obj.show);
    }
  }
}