// código creado por Rey Rufino
import { msg, clockString } from '../lib/helpers.js'

export default function (bot) {

  bot.command('ping', async (ctx) => {
    const start = Date.now()
    const sent  = await ctx.reply('🏓 Calculando\\.\\.\\.')
    const ms    = Date.now() - start

    await ctx.api.editMessageText(
      ctx.chat.id,
      sent.message_id,
      msg(`⚡ *Pong\\!*\n🌈 Latencia » ${ms}ms\n🌈 Uptime   » ${clockString(process.uptime() * 1000)}`),
      { parse_mode: 'MarkdownV2' }
    )
  })

}