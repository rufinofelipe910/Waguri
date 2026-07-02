// código creado por Rey Rufino 
import 'dotenv/config'
import { Bot, session } from 'grammy'
import { loadCommands } from './lib/loader.js'
import { clockString } from './lib/helpers.js'

const bot = new Bot(process.env.BOT_TOKEN)

bot.use(session({ initial: () => ({}) }))

console.log(`
✿°• 𝗪𝗔𝗚𝗨𝗥𝗜 𝗕𝗢𝗧 •°✿
⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑
🌸 Iniciando Waguri Bot para Telegram...
`)

await loadCommands(bot)

bot.catch((err) => {
  console.error('Error en el bot:', err.message)
})

await bot.start({
  onStart: (info) => {
    console.log(`✅ @${info.username} conectado y listo~`)
    console.log(`⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑\n`)
  }
})