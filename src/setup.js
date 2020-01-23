#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(__dirname + "/config.json")
const CORE_AUDIO_PATH = path.join(__dirname + "/../node_modules/speaker/deps/mpg123/src/output/coreaudio.c")
const edit = () => {
    let config = JSON.parse(fs.readFileSync(CONFIG_PATH))
    if(config.setup) {
        fs.copyFileSync(path.join(__dirname + "/coreaudio.c"), CORE_AUDIO_PATH)
        config.setup = false
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config))
    }
}

edit()