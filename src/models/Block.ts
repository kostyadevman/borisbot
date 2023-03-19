import { Model } from '@vuex-orm/core'
import Link from '@/models/Link'
import { v4 as uuidv4 } from 'uuid'

export default class Block extends Model {
  static entity = 'blocks'

  public static fields() {
    return {
      id: this.uid(() => uuidv4()),
      x: this.number(0),
      y: this.number(0),
      links: this.hasMany(Link, 'link_id')
    }
  }
}
