export class Staff {
  public id: number;
  public name: string;
  public activity: string;
  public desc: string;
  public image: string;
  public show: number;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.name && (this.name = obj.name);
      obj.activity && (this.activity = obj.activity);
      obj.desc && (this.desc = obj.desc);
      obj.image && (this.image = obj.image);
      obj.show && (this.show = obj.show);
    }
  }
}