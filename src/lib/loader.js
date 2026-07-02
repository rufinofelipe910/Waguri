// código creado por Rey Rufino
import { readdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const COMMANDS_DIR = resolve(__dirname, '../commands')

export async function loadCommands(bot) {
  const files = readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.js'))
  let loaded = 0

  for (const file of files) {
    try {
      const mod = await import(join(COMMANDS_DIR, file))
      if (typeof mod.default === 'function') {
        mod.default(bot)
        loaded++
        console.log(`✅ Comando cargado: ${file}`)
      }
    } catch (e) {
      console.error(`❌ Error cargando ${file}:`, e.message)
    }
  }

  console.log(`\n🌸 ${loaded} comandos cargados correctamente\n`)
}