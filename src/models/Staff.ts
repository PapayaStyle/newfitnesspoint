export class Staff {
  public id: string;
  public name: string;
  public activity: string;
  public description: string;
  public image: string;
  public portrait: string;
  public showed: number;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.id && (this.id = obj.id);
      obj.name && (this.name = obj.name);
      obj.activity && (this.activity = obj.activity);
      obj.description && (this.description = obj.description);
      obj.image && (this.image = obj.image);
      obj.portrait && (this.portrait = obj.portrait);
      obj.showed && (this.showed = obj.showed);
    }
  }
}