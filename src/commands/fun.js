// código creado por Rey Rufino
import { msg } from '../lib/helpers.js'

const RETOS = [
  'Di el abecedario al revés en 10 segundos 🔤',
  'Haz 10 flexiones ahora mismo 💪',
  'Canta el estribillo de tu canción favorita 🎤',
  'Escribe tu nombre con el codo ⌨️',
  'Mantén los ojos cerrados por 30 segundos 👁️',
  'Di 10 países sin repetir en 15 segundos 🌍',
  'Imita a tu artista favorito por 10 segundos 🎭',
]

const PIROPOS = [
  'Si la belleza fuera delito, estarías presa de por vida 💋',
  'Eres tan hermosa que haces olvidar mi nombre... y el tuyo 🌹',
  'Dios tardó más en hacerte porque las obras maestras llevan tiempo ✨',
  'Si los ángeles supieran que estás aquí, se morirían de envidia 🌸',
  'Eres el tipo de persona que hace que los lunes valgan la pena 💕',
]

const FACTS = [
  'Los pulpos tienen tres corazones 🐙',
  'Las abejas pueden reconocer caras humanas 🐝',
  'Un día en Venus dura más que un año en Venus 🪐',
  'Los delfines duermen con un ojo abierto 🐬',
  'La miel nunca caduca, se encontró miel de 3000 años en Egipto 🍯',
  'Los flamencos son blancos, se vuelven rosados por lo que comen 🦩',
]

export default function (bot) {

  bot.command('facto', async (ctx) => {
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)]
    await ctx.reply(msg(`📖 *DATO ALEATORIO*\n\n🌈 ${fact}`), { parse_mode: 'Markdown' })
  })

  bot.command('piropo', async (ctx) => {
    const piropo = PIROPOS[Math.floor(Math.random() * PIROPOS.length)]
    await ctx.reply(msg(`💋 *PIROPO*\n\n🌈 ${piropo}`), { parse_mode: 'Markdown' })
  })

  bot.command('reto', async (ctx) => {
    const reto = RETOS[Math.floor(Math.random() * RETOS.length)]
    await ctx.reply(msg(`🎯 *RETO*\n\n🌈 ${reto}`), { parse_mode: 'Markdown' })
  })

  bot.command('iqtest', async (ctx) => {
    const iq    = Math.floor(Math.random() * 60) + 70
    const emoji = iq >= 120 ? '🧠' : iq >= 100 ? '😊' : iq >= 85 ? '😐' : '💀'
    await ctx.reply(msg(`🧠 *TEST DE IQ*\n\n🌈 Tu IQ es: *${iq}* ${emoji}`), { parse_mode: 'Markdown' })
  })

  bot.command('gey', async (ctx) => {
    const pct   = Math.floor(Math.random() * 101)
    const emoji = pct >= 80 ? '🏳️‍🌈' : pct >= 50 ? '🤔' : '😎'
    const name  = ctx.from.first_name || 'tú'
    await ctx.reply(msg(`🌈 *GAY TEST*\n\n🌈 ${name} es *${pct}%* gay ${emoji}`), { parse_mode: 'Markdown' })
  })

  bot.command('doxear', async (ctx) => {
    const name = ctx.from.first_name || 'usuario'
    await ctx.reply(msg(
      `🕵️ *DOXEO SIMULADO*\n\n` +
      `🌈 Nombre: ${name}\n` +
      `🌈 IP: ${randomIP()}\n` +
      `🌈 Ubicación: Narnia 🗺️\n` +
      `🌈 Contraseña: hunter2\n` +
      `🌈 Tarjeta: **** **** **** 6969\n\n` +
      `_\\(Esto es una broma, no datos reales\\)_`
    ), { parse_mode: 'Markdown' })
  })

}

function randomIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.')
}