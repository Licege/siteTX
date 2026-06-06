import {ContentState, convertToRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import {unemojify} from 'node-emoji'

export const normalizeEditorHtml = (html = '') => {
  const trimmed = html.trim()
  if (!trimmed) return ''

  const blocksFromHtml = htmlToDraft(trimmed)
  const {contentBlocks, entityMap} = blocksFromHtml

  if (!contentBlocks?.length) return ''

  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  return unemojify(draftToHtml(convertToRaw(contentState)))
}

export const isEditorHtmlEqual = (left = '', right = '') =>
  normalizeEditorHtml(left) === normalizeEditorHtml(right)
