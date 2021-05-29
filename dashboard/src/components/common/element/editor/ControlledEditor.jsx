import React from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { unemojify } from 'node-emoji'

export default class ControlledEditor extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            editorState: this.init(props.value),
        }
        this.props.onChange(
            draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        )
    }

    init = content => {
        if (content) {
            const blocksFromHtml = htmlToDraft(content)
            const { contentBlocks, entityMap } = blocksFromHtml
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
            return EditorState.createWithContent(contentState)
        }
        return EditorState.createEmpty()
    }


    onEditorStateChange = editorState => {
        const { onChange, value } = this.props

        const newValue = unemojify(
            draftToHtml(convertToRaw(editorState.getCurrentContent())),
        )

        if (value !== newValue) {
            onChange(newValue)
        }

        this.setState({
            editorState,
        })
    }

    render() {
        const { editorState } = this.state
        return (
            <div>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{
                        locale: 'ru',
                    }}
                />
            </div>
        )
    }
}
