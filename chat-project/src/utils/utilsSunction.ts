export const validateDate = (dateString: string) => {
  console.log('val', dateString)
  console.log('val2', dateString.split('.').map(Number))
  const [day, month, year] = dateString.split('.').map(Number)
  console.log('val3', [day, month, year])
  const isValidDay =
    !isNaN(day) &&
    !isNaN(month) &&
    !isNaN(year) &&
    day > 0 &&
    day < 32 &&
    month > 0 &&
    month < 13 &&
    year > 1900 &&
    year <= new Date().getFullYear()

  return isValidDay
}
