// código creado por Rey Rufino
import fetch from 'node-fetch'
import { InputFile } from 'grammy'
import { msg } from '../lib/helpers.js'

const API_KEY = process.env.APICAUSAS_KEY
const API_URL = 'https://rest.apicausas.xyz/api/v1/descargas/mediafire'

export default function (bot) {

  bot.command(['mediafire', 'mf'], async (ctx) => {
    const text = ctx.match?.trim()
    if (!text || !text.startsWith('http')) {
      return ctx.reply(msg(`🔥 Ingresa un link de MediaFire~\n\n💖 *Ejemplo:*\n🌈 /mediafire https://www.mediafire.com/file/xxx`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`⌚ Descargando de MediaFire~\nPor favor espera 🌸`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`${API_URL}?apikey=${API_KEY}&url=${encodeURIComponent(text)}`)
      const data = await res.json()

      console.log('Respuesta MediaFire:', JSON.stringify(data))

      const fileUrl =
        data?.url ||
        data?.result?.url ||
        data?.data?.url ||
        data?.link ||
        data?.result?.link ||
        null

      const filename = data?.filename || data?.result?.filename || 'archivo'

      if (!data.status || !fileUrl) throw new Error('No pude descargar ese archivo de MediaFire')

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

      await ctx.replyWithDocument(fileUrl, {
        caption: msg(`✅ *${filename}* 🌸`),
        parse_mode: 'Markdown'
      })

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