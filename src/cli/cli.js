import blessed from 'blessed'
import detectSong from '../detect-song'
import { createControls, updateControls, updateColor } from './controls'
import audioVisualizer from '../audio-visualize/audio-visualizer'

const keys = {
    VOLUME_DOWN: 'left',
    VOLUME_UP: 'right',
    GET_CURRENT_SONG: 'C-a',
    EXIT: 'C-c'
}

const init = lofiStream => {
    const screen = blessed.screen({
        smartCSR: true,
        grabKeys: true
    })
    screen.title = 'lofi-cli'

    const title = blessed.text({
        left: 'center',
        tags: true,
        content: ' {bold}LOFI{/bold}',
        align: 'center',
        style: {
            bg: '#ad006e'
        }
    })

    const controls = createControls()

    screen.append(controls.box)
    screen.append(title)
    screen.render()

    const cli = {
        screen: screen,
        controls: controls
    }
    screen.on('keypress', onKeyPress(cli, lofiStream))

    audioVisualizer(lofiStream.stream, updateColor(controls, screen))
    return cli
}

const onKeyPress = (cli, lofiStream) => (ch, key) => {
    const offset = 0.1
    switch (key.full) {
    case keys.VOLUME_DOWN:
        if (lofiStream.volume.volume - offset >= 0) updateVolume(lofiStream.volume.volume - 0.1, cli, lofiStream)
        break
    case keys.VOLUME_UP:
        if (lofiStream.volume.volume + offset <= 1) updateVolume(lofiStream.volume.volume + 0.1, cli, lofiStream)
        break
    case keys.GET_CURRENT_SONG:
        detectSong().then(song => console.log(`Current song: ${song}`))
        break
    case keys.EXIT:
        process.exit(1)
    }
}

const updateVolume = (volume, cli, lofiStream) => {
    lofiStream.volume.setVolume(volume)
    cli.controls.volume = volume
    updateControls(cli.controls)
    updateScreen(cli)
}

const updateScreen = cli => cli.screen.render()

export default init
