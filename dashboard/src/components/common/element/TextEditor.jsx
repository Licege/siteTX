import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


const TextEditor = ( { state, onEditorStateChange } ) => {
    return (
        <div>
            <Editor
                editorState={state}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                localization={{
                    locale: 'ru',
                }}
            />
        </div>
    )
}

export default TextEditor
