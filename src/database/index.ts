import { Database } from '@vuex-orm/core'
import Block from '@/models/Block'


const database = new Database()

database.register(Block)

export default database