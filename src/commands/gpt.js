// código creado por Rey Rufino
import fetch from 'node-fetch'
import { msg } from '../lib/helpers.js'

export default function (bot) {

  bot.command(['gpt', 'chatgpt'], async (ctx) => {
    const text = ctx.match?.trim()
    if (!text) {
      return ctx.reply(msg(`🟢 Ingresa tu pregunta~\n\n💖 *Ejemplo:*\n🌈 /gpt ¿quién eres?`), { parse_mode: 'Markdown' })
    }

    const processing = await ctx.reply(msg(`⌚ ChatGPT está procesando~\n🌈 ${text}`), { parse_mode: 'Markdown' })

    try {
      const res = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openai',
          messages: [{ role: 'user', content: text }]
        })
      })

      const data     = await res.json()
      const response = data?.choices?.[0]?.message?.content || 'No se recibió respuesta válida'

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
        msg(`❌ Error conectando con ChatGPT~\n⚠️ ${e.message}`),
        { parse_mode: 'Markdown' }
      )
    }
  })

}