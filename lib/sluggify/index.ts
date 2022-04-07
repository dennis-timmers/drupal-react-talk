export default function sluggify (input = ''): string {
  return input
    .toLowerCase()
    .replace(/[_'()]/gu, '')
    .replace(/[^\w\u007F-\uFFFF]/gu, ' ')
    .trim()
    .replace(/ +/gu, '-')
}
