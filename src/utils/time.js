export const parseTime = (secends) => {
  if (secends > 3600) return `${Math.floor(secends/3600)}h ${parseTime(secends%3600)}`
  if (secends > 60) return `${Math.floor(secends/60)}' ${secends%60}s`
  return `${secends}s`
}
export const parseDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
