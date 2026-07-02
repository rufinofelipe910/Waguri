// código creado por Rey Rufino
import fetch from 'node-fetch'
import { InputFile } from 'grammy'
import { msg } from '../lib/helpers.js'

const API_KEY = process.env.APICAUSAS_KEY
const API_URL = 'https://rest.apicausas.xyz/api/v1/descargas/instagram'

export default function (bot) {

  bot.command(['ig', 'igdl'], async (ctx) => {
    const text = ctx.match?.trim()
    if (!text || !text.startsWith('http')) {
      return ctx.reply(msg(`📷 Ingresa un link de Instagram~\n\n💖 *Ejemplo:*\n🌈 /ig https://www.instagram.com/reel/xxx/`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`⌚ Descargando de Instagram~\nPor favor espera 🌸`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`${API_URL}?apikey=${API_KEY}&url=${encodeURIComponent(text)}`)
      const data = await res.json()

      const mediaList =
        data?.medias ||
        data?.result?.medias ||
        data?.data?.medias ||
        (data?.url ? [data.url] : null) ||
        null

      if (!data.status || !mediaList?.length) throw new Error('No pude descargar ese contenido de Instagram')

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

      for (const item of mediaList) {
        const url     = typeof item === 'string' ? item : item?.url
        const isVideo = /\.mp4(\?|$)/i.test(url) || data.type === 'video'

        if (isVideo) {
          await ctx.replyWithVideo(url, { caption: msg(`✅ Video de Instagram 🌸`), parse_mode: 'Markdown' })
        } else {
          await ctx.replyWithPhoto(url, { caption: msg(`✅ Imagen de Instagram 🌸`), parse_mode: 'Markdown' })
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