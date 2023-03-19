import { Model } from '@vuex-orm/core'
import { v4 as uuidv4 } from 'uuid'

export default class Link extends Model {
  static entity = 'links'

  public static fields() {
    return {
      id: this.uid(() => uuidv4()),
      start: this.string(''),
      startCircle: this.string(''),
      end: this.string(''),
      endCircle: this.string('')
    }
  }
}
