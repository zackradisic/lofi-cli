import ytdl from 'ytdl-core'
import FFmpeg from 'fluent-ffmpeg'
import { PassThrough } from 'stream'

import lame from 'lame'
import Speaker from 'speaker'
import Volume from 'pcm-volume'
import { URL } from './config'

const Decoder = lame.Decoder

const decoderStream = Decoder()
const speakerStream = new Speaker()
const v = new Volume()

const playStream = () => {
    const ytStream = ytdl(URL, {
        audioonly: true
    })

    const stream = new PassThrough()
    const ffmpeg = new FFmpeg(ytStream)

    ffmpeg.on('error', (error) => {
        console.log(error)
    })

    ffmpeg.format('mp3').pipe(stream)
    stream.pipe(decoderStream).pipe(v).pipe(speakerStream)

    return { stream: stream, volume: v }
}

export default playStream
