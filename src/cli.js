import { terminal } from 'terminal-kit'
import detectSong from './detect-song'

const keys = {
    VOLUME_DOWN: 'LEFT',
    VOLUME_UP: 'RIGHT',
    GET_CURRENT_SONG: 'CTRL_A',
    EXIT: 'CTRL_C'
}

const init = lofiStream => {
    terminal.green.bold('Playing ChilledCow stream...\n')
    terminal.grabInput()
    const progressBar = terminal.progressBar({
        width: 80,
        title: 'Volume',
        eta: false,
        percent: true,
        barHeadChar: '=',
        syncMode: true
    })

    const cli = { terminal: terminal, progressBar: progressBar }

    progressBar.update(lofiStream.volume.volume)
    terminal.on('key', name => menuOnClick(cli, lofiStream)(name))

    return cli
}

const menuOnClick = (cli, lofiStream) => keyName => {
    const offset = 0.1
    switch (keyName) {
    case keys.VOLUME_DOWN:
        if (lofiStream.volume.volume - offset >= 0) lofiStream.volume.setVolume(lofiStream.volume.volume - 0.1)
        break
    case keys.VOLUME_UP:
        if (lofiStream.volume.volume + offset <= 1) lofiStream.volume.setVolume(lofiStream.volume.volume + 0.1)
        break
    case keys.GET_CURRENT_SONG:
        detectSong().then(song => console.log(`Current song: ${song}`))
        break
    case keys.EXIT:
        process.exit(1)
    }
    cli.progressBar.update(lofiStream.volume.volume)
}

export default init
