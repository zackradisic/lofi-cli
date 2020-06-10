#!/usr/bin/env node

import { terminal } from 'terminal-kit'
import playStream from './youtube-stream'

const keys = {
    VOLUME_DOWN: 'LEFT',
    VOLUME_UP: 'RIGHT',
    EXIT: 'CTRL_C'
}
const main = () => {
    terminal.green.bold('Playing ChilledCow stream...\n')
    terminal.grabInput()
    const lofiStream = playStream()

    terminal.on('key', (name, matches, data) => {
        const offset = 0.1
        switch (name) {
        case keys.VOLUME_DOWN:
            if (lofiStream.volume.volume - offset >= 0) lofiStream.volume.setVolume(lofiStream.volume.volume - 0.1)
            break
        case keys.VOLUME_UP:
            if (lofiStream.volume.volume + offset <= 1) lofiStream.volume.setVolume(lofiStream.volume.volume + 0.1)
            break
        case keys.EXIT:
            process.exit(1)
        }
    })
}

main()
