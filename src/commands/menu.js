// código creado por Rey Rufino
import { clockString } from '../lib/helpers.js'
import db from '../database/db.js'

export default function (bot) {

  bot.command(['start', 'menu', 'help'], async (ctx) => {
    const uptime   = clockString(process.uptime() * 1000)
    const usuarios = Object.keys(db.data.users).length
    const name     = ctx.from.first_name || 'usuario'

    const txt = `✿°• 𝗪𝗔𝗚𝗨𝗥𝗜 𝗕𝗢𝗧 •°✿
⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑
🌸 ¡Hola ${name}\\! ⸜(｡˃ᵕ˂)⸝♡
⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑
⏱️ *Uptime* » ${uptime}
👥 *Users*  » ${usuarios}

💖 *HERRAMIENTAS*
🌈 /ping
🌈 /autoadmin
🌈 /demote
🌈 /leave
🌈 /tag
🌈 /invocar
🌈 /logotipo
🌈 /setbanner
🌈 /setcurrency
🌈 /setname
🌈 /setprimary
🌈 /bots
🌈 /reload
🌈 /setprefijo
🌈 /quitarpref
🌈 /update
🌈 /kick
🌈 /antilink
🌈 /del
🌈 /join
🌈 /reg
🌈 /creador
🌈 /repo
🌈 /link
🌈 /sticker
🌈 /emojimix
🌈 /letra

💖 *DIVERSIÓN*
🌈 /doxear
🌈 /facto
🌈 /piropo
🌈 /reto
🌈 /top
🌈 /iqtest
🌈 /gey

💖 *ANIME*
🌈 /bath
🌈 /bite
🌈 /blush
🌈 /bored
🌈 /buenas\_noches
🌈 /buenos\_dias
🌈 /cry
🌈 /dance
🌈 /fumar
🌈 /hug
🌈 /kiss
🌈 /pensar
🌈 /sacred
🌈 /slap
🌈 /sleep

💖 *INTELIGENCIA ARTIFICIAL*
🌈 /claude
🌈 /gemini
🌈 /gpt
🌈 /copilot
🌈 /flux

💖 *STALK*
🌈 /github
🌈 /instagram
🌈 /tiktok

💖 *DESCARGAS*
🌈 /play
🌈 /play2
🌈 /tiktoksearch
🌈 /ig
🌈 /apk
🌈 /pin
🌈 /fb
🌈 /mediafire

💖 *RPG*
🌈 /cazar
🌈 /contratos
🌈 /aceptar
🌈 /completar
🌈 /perfil
🌈 /diario
🌈 /minar
🌈 /transferir
🌈 /taller
🌈 /comprar
🌈 /item
🌈 /vender
🌈 /duelo
🌈 /hack
🌈 /best
🌈 /estadisticas
🌈 /inventario

💖 *ECONOMÍA*
🌈 /trabajar
🌈 /balance
🌈 /pay
🌈 /rob
🌈 /deposit
🌈 /withdraw
⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑
🌸 _Waguri Bot para Telegram_`

    await ctx.reply(txt, { parse_mode: 'Markdown' })
  })

}