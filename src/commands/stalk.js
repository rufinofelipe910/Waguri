// código creado por Rey Rufino
import fetch from 'node-fetch'
import { msg } from '../lib/helpers.js'

const API_KEY = process.env.APICAUSAS_KEY

export default function (bot) {

  // /github <usuario>
  bot.command('github', async (ctx) => {
    const user = ctx.match?.trim()
    if (!user) return ctx.reply(msg(`🐙 Ingresa un usuario de GitHub~\n\n💖 *Ejemplo:*\n🌈 /github rufinofelipe910`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`https://api.github.com/users/${user}`)
      const data = await res.json()
      if (data.message === 'Not Found') throw new Error('Usuario no encontrado')

      await ctx.replyWithPhoto(data.avatar_url, {
        caption: msg(
          `🐙 *${data.name || data.login}*\n\n` +
          `💖 *INFO*\n` +
          `🌈 Usuario    » ${data.login}\n` +
          `🌈 Repos      » ${data.public_repos}\n` +
          `🌈 Seguidores » ${data.followers}\n` +
          `🌈 Siguiendo  » ${data.following}\n` +
          `🌈 Bio        » ${data.bio || 'Sin bio'}\n` +
          `🌈 Perfil     » ${data.html_url}`
        ),
        parse_mode: 'Markdown'
      })
    } catch (e) {
      await ctx.reply(msg(`❌ ${e.message}`), { parse_mode: 'Markdown' })
    }
  })

  // /tiktok <usuario>
  bot.command('tiktok', async (ctx) => {
    const user = ctx.match?.trim()
    if (!user) return ctx.reply(msg(`🎵 Ingresa un usuario de TikTok~\n\n💖 *Ejemplo:*\n🌈 /tiktok waguri`), { parse_mode: 'Markdown' })

    const processing = await ctx.reply(msg(`🔎 Buscando perfil de TikTok~`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`https://rest.apicausas.xyz/api/v1/stalk/tiktok?apikey=${API_KEY}&user=${encodeURIComponent(user)}`)
      const data = await res.json()

      if (!data.status) throw new Error('No encontré ese perfil de TikTok')

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

      const info = data.result || data.data || data
      await ctx.reply(msg(
        `🎵 *${info.nickname || user}*\n\n` +
        `💖 *INFO*\n` +
        `🌈 Usuario     » @${info.username || user}\n` +
        `🌈 Seguidores  » ${info.followers || 'N/A'}\n` +
        `🌈 Siguiendo   » ${info.following || 'N/A'}\n` +
        `🌈 Likes       » ${info.likes || 'N/A'}\n` +
        `🌈 Videos      » ${info.videos || 'N/A'}\n` +
        `🌈 Bio         » ${info.bio || 'Sin bio'}`
      ), { parse_mode: 'Markdown' })

    } catch (e) {
      await ctx.api.editMessageText(
        ctx.chat.id,
        processing.message_id,
        msg(`❌ ${e.message}`),
        { parse_mode: 'Markdown' }
      ).catch(() => {})
    }
  })

  // /instagram <usuario>
  bot.command('instagram', async (ctx) => {
    const user = ctx.match?.trim()
    if (!user) return ctx.reply(msg(`📸 Ingresa un usuario de Instagram~\n\n💖 *Ejemplo:*\n🌈 /instagram waguri`), { parse_mode: 'Markdown' })

    const processing = await ctx.reply(msg(`🔎 Buscando perfil de Instagram~`), { parse_mode: 'Markdown' })

    try {
      const res  = await fetch(`https://rest.apicausas.xyz/api/v1/stalk/instagram?apikey=${API_KEY}&user=${encodeURIComponent(user)}`)
      const data = await res.json()

      if (!data.status) throw new Error('No encontré ese perfil de Instagram')

      await ctx.api.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {})

      const info = data.result || data.data || data
      await ctx.reply(msg(
        `📸 *${info.fullname || user}*\n\n` +
        `💖 *INFO*\n` +
        `🌈 Usuario     » @${info.username || user}\n` +
        `🌈 Seguidores  » ${info.followers || 'N/A'}\n` +
        `🌈 Siguiendo   » ${info.following || 'N/A'}\n` +
        `🌈 Posts       » ${info.posts || 'N/A'}\n` +
        `🌈 Bio         » ${info.bio || 'Sin bio'}\n` +
        `🌈 Privado     » ${info.is_private ? 'Sí' : 'No'}`
      ), { parse_mode: 'Markdown' })

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