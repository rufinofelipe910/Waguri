// código creado por Rey Rufino
import fetch from 'node-fetch'
import { msg } from '../lib/helpers.js'

const API_KEY = process.env.APICAUSAS_KEY
const API_URL = 'https://rest.apicausas.xyz/api/v1/descargas/facebook'

export default function (bot) {

  bot.command(['fb', 'facebook', 'fbdl'], async (ctx) => {
    const text = ctx.match?.trim()
    if (!text || !text.startsWith('http')) {
      return ctx.reply(msg(`📘 Ingresa un link de Facebook~\n\n💖 *Ejemplo:*\n🌈 /fb https://www.facebook.com/watch?v=xxx`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`⌚ Descargando de Facebook~\nPor favor espera 🌸`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`${API_URL}?apikey=${API_KEY}&url=${encodeURIComponent(text)}`)
      const data = await res.json()

      const videoUrl =
        data?.url ||
        data?.result?.url ||
        data?.data?.url ||
        data?.hd ||
        data?.sd ||
        data?.medias?.[0]?.url ||
        null

      if (!data.status || !videoUrl) throw new Error('No pude descargar ese video de Facebook')

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

      await ctx.replyWithVideo(videoUrl, {
        caption: msg(`✅ *${data.title || 'Video de Facebook'}* 🌸`),
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