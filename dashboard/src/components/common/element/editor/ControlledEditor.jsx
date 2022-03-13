import React from 'react'
import {EditorState, ContentState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {unemojify} from 'node-emoji'
import styled from 'styled-components';

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
        const {contentBlocks, entityMap} = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        return EditorState.createWithContent(contentState)
      }
      return EditorState.createEmpty()
    }


    onEditorStateChange = editorState => {
      const {onChange, value} = this.props

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
      const {placeholder, autoCapitalize = true, autoComplete = true} = this.props
      const {editorState} = this.state

      return (
        <EditorWrapper>
          <Editor placeholder={placeholder}
                  autoCapitalize={autoCapitalize}
                  autoComplete={autoComplete}
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  localization={{
                    locale: 'ru',
                }}/>
        </EditorWrapper>
      )
    }
}

const EditorWrapper = styled.div`
    min-width: 280px;
    min-height: 300px;
    border: 1px solid ${props => props.theme.colors.gray.light};
    margin-bottom: 20px;

    .rdw-editor-main {
        padding: 10px;
        min-height: 250px;
    }
`
