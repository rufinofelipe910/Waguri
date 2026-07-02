// código creado por Rey Rufino
import fetch from 'node-fetch'
import { msg } from '../lib/helpers.js'

const API_KEY = process.env.APICAUSAS_KEY
const API_URL = 'https://rest.apicausas.xyz/api/v1/ai/gemini'

export default function (bot) {

  bot.command('gemini', async (ctx) => {
    const text = ctx.match?.trim()
    if (!text) {
      return ctx.reply(msg(`🟡 Ingresa tu pregunta~\n\n💖 *Ejemplo:*\n🌈 /gemini ¿quién eres?`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`⌚ Gemini está procesando~\n🌈 ${text}`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`${API_URL}?apikey=${API_KEY}&q=${encodeURIComponent(text)}`)
      const data = await res.json()
      const response = data.result || data.response || data.answer || data.text || 'No se recibió respuesta válida'

      await ctx.api.editMessageText(
        ctx.chat.id,
        processing.message_id,
        response,
        { parse_mode: 'Markdown' }
      )

    } catch (e) {
      await ctx.api.editMessageText(
        ctx.chat.id,
        processing.message_id,
        msg(`❌ Error conectando con Gemini~\n⚠️ ${e.message}`),
        { parse_mode: 'Markdown' }
      )
    }
  })

}