// código creado por Rey Rufino
import fetch from 'node-fetch'
import yts   from 'yt-search'
import fs    from 'fs'
import path  from 'path'
import { InputFile } from 'grammy'
import { msg, formatViews } from '../lib/helpers.js'

const API_KEY  = process.env.APICAUSAS_KEY
const API_BASE = 'https://rest.apicausas.xyz/api/v1/descargas/youtube'
const YT_REGEX = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const fetchTimeout = (url, ms = 30000) => {
  const ctrl = new AbortController()
  const t    = setTimeout(() => ctrl.abort(), ms)
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(t))
}

async function handlePlay(ctx, type) {
  const text = ctx.match?.trim()
  if (!text) {
    return ctx.reply(msg(`🎵 Ingresa el nombre o link~\n\n💖 *Ejemplo:*\n🌈 /${type === 'audio' ? 'play' : 'play2'} bad bunny`), { parse_mode: 'Markdown' })
  }

  const processing = await ctx.reply(msg(`⌚ Buscando *${text}*~\nPor favor espera 🌸`), { parse_mode: 'Markdown' })

  try {
    const idMatch = text.match(YT_REGEX)
    const video   = idMatch
      ? await yts({ videoId: idMatch[1] })
      : (await yts(text)).videos?.[0]

    if (!video?.title) throw new Error('No encontré resultados para esa búsqueda')

    const { title, thumbnail, timestamp, views, ago, url } = video
    const vistas = formatViews(views)

    await ctx.api.editMessageText(
      ctx.chat.id,
      processing.message_id,
      msg(`${type === 'audio' ? '🎵' : '🎬'} *${title}*\n\n💖 *DETALLES*\n🌈 Vistas   » ${vistas}\n🌈 Duración » ${timestamp}\n🌈 Subido   » ${ago}\n\n📥 Descargando~ 🌸`),
      { parse_mode: 'Markdown' }
    )

    const apiUrl = `${API_BASE}?apikey=${API_KEY}&url=${encodeURIComponent(url)}&type=${type}`
    const res    = await fetchTimeout(apiUrl, 35000)
    const json   = await res.json()

    if (!json?.status || !json?.data?.download?.url) throw new Error(json?.message || 'La API no devolvió enlace de descarga')

    const dlUrl = json.data.download.url
    fs.mkdirSync('./tmp', { recursive: true })
    const ext   = type === 'audio' ? 'mp3' : 'mp4'
    const fPath = path.join('./tmp', `${Date.now()}.${ext}`)

    const buf = await fetchTimeout(dlUrl, 60000).then(r => r.arrayBuffer())
    fs.writeFileSync(fPath, Buffer.from(buf))

    await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

    if (type === 'audio') {
      await ctx.replyWithAudio(new InputFile(fPath), {
        title,
        caption: msg(`✅ *¡Listo\\!* Tu audio llegó~\n🌈 ${title}`),
        parse_mode: 'Markdown'
      })
    } else {
      await ctx.replyWithVideo(new InputFile(fPath), {
        caption: msg(`✅ *¡Listo\\!* Tu video llegó~\n🌈 ${title}`),
        parse_mode: 'Markdown'
      })
    }

    fs.unlinkSync(fPath)

  } catch (e) {
    await ctx.api.editMessageText(
      ctx.chat.id,
      processing.message_id,
      msg(`❌ Error~\n⚠️ ${e.message}`),
      { parse_mode: 'Markdown' }
    ).catch(() => {})
  }
}

export default function (bot) {
  bot.command(['play', 'yta', 'ytmp3'],  (ctx) => handlePlay(ctx, 'audio'))
  bot.command(['play2', 'ytv', 'ytmp4'], (ctx) => handlePlay(ctx, 'video'))
}