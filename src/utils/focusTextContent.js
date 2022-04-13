export default function focusTextContent (el) {
  const selection = window.getSelection()
  selection.removeAllRanges()
  var range = new Range()
  range.selectNodeContents(el)
  selection.addRange(range)
}
