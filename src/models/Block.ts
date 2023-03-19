import { Model } from '@vuex-orm/core'

export default class Block extends Model {
  static entity = 'blocks'
  static primaryKey = 'id';
  
  // id: any;

  static fields() {
    return {
        id: this.uid(),
        x: this.number(0),
        y: this.number(0)
    }
  }
}