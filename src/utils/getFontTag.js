import availableTags from '../app/availableTags'

export default function getFontTag (fontName) {
  return localStorage.getItem(fontName) ?? availableTags.slice(-1)[0]
}
