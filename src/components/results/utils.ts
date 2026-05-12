export function formatMs(ms: number): string {
  if (ms < 1000) return "0s"
  const totalSec = Math.round(ms / 1000)
  if (totalSec < 60) return `${totalSec}s`
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  if (sec === 0) return `${min}m`
  return `${min}m ${sec}s`
}

export function formatTimerMs(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${String(sec).padStart(2, "0")}`
}