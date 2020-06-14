import path from 'path'
import fs from 'fs'
import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import jimp from 'jimp'
import { createWorker } from 'tesseract.js'

import { DOWNLOADS_DIR_NAME, URL } from './config'

const detectSong = async () => {
    const videoPath = getFilePath('video', 'mp4')
    const imgPath = getFilePath('img', 'png')
    const croppedPath = getFilePath('cropped', 'png')

    try {
        await getVideo(videoPath) // Step 1. Download a snippet of the stream
        await createThumbnail(videoPath, imgPath) // Step 2. Generate a picture of a frame
        await cropThumbnail(imgPath) // Step 3. Crop thumbnail for text recognition
        const text = await recognizeText(croppedPath)
        console.log(text)
    } catch (err) {
        console.log(err)
    }
}

const recognizeText = async imgPath => {
    const worker = createWorker({
        cacheMethod: 'refresh'
    })
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const { data: { text } } = await worker.recognize(imgPath)
    await worker.terminate()
    return text
}

const getVideo = videoPath => {
    const stream = ytdl(URL, { filter: (format) => format.container === 'mp4' }).pipe(fs.createWriteStream(videoPath))

    // Right now we are waiting 3 seconds to wait until sufficient data has been
    // downloaded to take a screenshot with ffmpeg. In the future it is probably
    // best to run getThumbnail() in a loop and if an error occures, wait a short
    // time interval and retry.
    setTimeout(() => { stream.close() }, 3000)

    return new Promise((resolve, reject) => {
        stream.on('close', resolve)
        stream.on('error', err => reject(err))
    })
}

const cropThumbnail = async imgPath => {
    const img = await jimp.read(imgPath)
    img.crop(0, 0, 1440, 64).write(getFilePath('cropped', 'png'))
}

const createThumbnail = (videoPath, imgPath) => {
    console.log('Creating thumnbnail: ' + imgPath)

    const getThumbnail = ffmpeg(videoPath)

    getThumbnail
        .addOutputOption('-vframes')
        .addOutput('1')
        .addOutput(imgPath)

    getThumbnail.run()

    return new Promise((resolve, reject) => {
        getThumbnail.on('end', resolve)
        getThumbnail.on('err', err => reject(err))
    })
}

const getFilePath = (name, ext) => path.join(__dirname, '../', DOWNLOADS_DIR_NAME, `${name}.${ext}`)

export default detectSong
