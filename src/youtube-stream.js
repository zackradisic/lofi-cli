import ytdl from 'ytdl-core'
import FFmpeg from 'fluent-ffmpeg'
import { PassThrough } from 'stream'

import lame from 'lame'
import speaker from 'speaker'
const Decoder = lame.Decoder

const decoderStream = Decoder()
const speakerStream = new speaker()

const playStream = () => {
    const URL = 'https://www.youtube.com/watch?v=5qap5aO4i9A'
    const ytStream = ytdl(URL, {
        audioonly: true
    })

    const stream = new PassThrough()
    const ffmpeg = new FFmpeg(ytStream)

    ffmpeg.on('error', (error) => {
        console.log('bingo ' + error)
    })

    ffmpeg.format('mp3').pipe(stream)
    stream.pipe(decoderStream).pipe(speakerStream)

    return stream
}


export default playStream



