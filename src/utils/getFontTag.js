import availableTags from '../res/availableTags'

export default function getFontTag (fontName) {
  return localStorage.getItem(fontName) ?? availableTags.slice(-1)[0]
}
