import { Database } from '@vuex-orm/core'
import Block from '@/models/Block'
import Link from '@/models/Link'

const database = new Database()

database.register(Block)
database.register(Link)

export default database
