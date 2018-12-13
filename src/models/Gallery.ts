export class Gallery {
  public small: string;
  public medium: string;
  public big: string;
  public show: number;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.small && (this.small = obj.small);
      obj.medium && (this.medium = obj.medium);
      obj.big && (this.big = obj.big);
      obj.show && (this.show = obj.show);
    }
  }
}