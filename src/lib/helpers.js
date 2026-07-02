// código creado por Rey Rufino

export const HEADER = `✿°• 𝗪𝗔𝗚𝗨𝗥𝗜 𝗕𝗢𝗧 •°✿\n⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑`
export const SEP    = `⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑⌑`

export function msg(body) {
  return `${HEADER}\n\n${body}\n\n${SEP}`
}

export function formatViews(views) {
  if (!views) return 'N/A'
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}k`
  return views.toString()
}

export function clockString(ms) {
  const s = Math.floor((ms / 1000) % 60)
  const m = Math.floor((ms / (1000 * 60)) % 60)
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${h}h ${m}m ${s}s`
}