// código creado por Rey Rufino
import fetch from 'node-fetch'
import { msg } from '../lib/helpers.js'

const API_KEY = process.env.APICAUSAS_KEY
const API_URL = 'https://rest.apicausas.xyz/api/v1/buscadores/lirycs'

export default function (bot) {

  bot.command(['letra', 'lyrics'], async (ctx) => {
    const text = ctx.match?.trim()
    if (!text) {
      return ctx.reply(msg(`🎵 Ingresa el nombre de la canción~\n\n💖 *Ejemplo:*\n🌈 /letra bad bunny titi me pregunto`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`🔎 Buscando letra de *${text}*~`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`${API_URL}?apikey=${API_KEY}&q=${encodeURIComponent(text)}`)
      const data = await res.json()

      if (!data.status || !data.lyrics) throw new Error('No encontré la letra de esa canción')

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

      if (data.thumbnail) {
        await ctx.replyWithPhoto(data.thumbnail, {
          caption: `🎵 *${data.title || text}*\n👤 *Artista:* ${data.artist || 'Desconocido'}`,
          parse_mode: 'Markdown'
        })
      }

      const header  = `🎵 *${data.title || text}*\n👤 ${data.artist || 'Desconocido'}\n\n`
      const MAX     = 4000
      const fullTxt = header + data.lyrics

      if (fullTxt.length <= MAX) {
        await ctx.reply(fullTxt, { parse_mode: 'Markdown' })
      } else {
        let remaining = data.lyrics
        let first     = true
        while (remaining.length > 0) {
          const chunk = remaining.slice(0, MAX)
          remaining   = remaining.slice(MAX)
          await ctx.reply(first ? header + chunk : chunk, { parse_mode: 'Markdown' })
          first = false
        }
      }

    } catch (e) {
      await ctx.api.editMessageText(
        ctx.chat.id,
        processing.message_id,
        msg(`❌ ${e.message}`),
        { parse_mode: 'Markdown' }
      ).catch(() => {})
    }
  })

}