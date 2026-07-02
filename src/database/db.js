// código creado por Rey Rufino
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { mkdirSync } from 'fs'

mkdirSync('./data', { recursive: true })

const adapter = new JSONFile('./data/db.json')
const db      = new Low(adapter, {
  users: {},
  chats: {}
})

await db.read()
db.data ||= { users: {}, chats: {} }
await db.write()

export default db