const daysSince = (dateString) => {
  const msSinceDate = Math.abs(Date.now() - Date.parse(dateString))
  const msInDay = 1000 * 60 * 60 * 24
  return msSinceDate / msInDay
}