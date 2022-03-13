import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const Gallery = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => prevFiles.concat(acceptedFiles))
  }, [])
  console.log(files);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Gallery