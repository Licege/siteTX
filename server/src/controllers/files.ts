import path from 'path';
import * as fileLib from '../lib/file';

export const downloadFiles = async (req: any, res: any) => {}

export const testUploadFiles = async (req: any, res: any) => {
  try {
    const destination = path.resolve(__dirname, '../../', 'uploads')
    const src = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
    res.send(200).json({ src })
  } catch (e) {
    console.error(e)
  }
}
