export const filter = (text: string) => {
  return text.replace(/[^a-zA-Z0-9]/g, '')
}
