#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(__dirname + "/config.json")
const CORE_AUDIO_PATH = path.join(__dirname + "/../node_modules/speaker/deps/mpg123/src/output/coreaudio.c")
const setup = () => {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH))
    if(config.setup) {
        // The node-speaker package relies on the library mpg123 to play audio, which
        // unfortunately has an annoying warning that is displayed frequently.
        // It is likely due to network inconsistencies from streaming, resulting in no audio data being
        // sent to the speaker module resulting the "buffer underflow" warning.
        //
        // This warning seems like it should only appear to MacOS users because it occurs
        // in `coreaudio.c`, which handles audio output to MacOS machines in mpg123.
        //
        // The solution for now is to simply comment out the warning in `coreaudio.c`, and build
        // mpg123 again using node-gyp.
        fs.copyFileSync(path.join(__dirname + "/coreaudio.c"), CORE_AUDIO_PATH)
        config.setup = false
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config))
    }
}

setup()