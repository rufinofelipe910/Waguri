// código creado por Rey Rufino
import fetch from 'node-fetch'
import { msg } from '../lib/helpers.js'

const API_KEY  = process.env.NEXEVO_KEY
const API_BASE = 'https://nexevo.boxmine.xyz/ai/flux'

export default function (bot) {

  bot.command(['flux', 'imagine', 'gen'], async (ctx) => {
    const text = ctx.match?.trim()
    if (!text) {
      return ctx.reply(msg(`🖼️ Ingresa una descripción~\n\n💖 *Ejemplo:*\n🌈 /flux gato en el espacio`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`🎨 Generando imagen~\n✨ ${text}\n\nPor favor espera 🌸`), { parse_mode: 'Markdown' })

    try {
      const res = await fetch(`${API_BASE}?prompt=${encodeURIComponent(text)}&apikey=${API_KEY}`)
      if (!res.ok) throw new Error(`API respondió con status ${res.status}`)

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('image')) throw new Error('La API no devolvió una imagen')

      const buffer = Buffer.from(await res.arrayBuffer())

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})
      await ctx.replyWithPhoto(new InputFile(buffer, 'waguri_flux.jpg'), {
        caption: msg(`✅ *¡Imagen generada\\!* 🌸\n\n💖 *Prompt:*\n🌈 ${text}`),
        parse_mode: 'Markdown'
      })

    } catch (e) {
      await ctx.api.editMessageText(
        ctx.chat.id,
        processing.message_id,
        msg(`❌ Error generando imagen~\n⚠️ ${e.message}`),
        { parse_mode: 'Markdown' }
      )
    }
  })

}