import blessed from 'blessed'

export const createControls = () => ({
    currentSong: undefined,
    volume: 1,
    box: blessed.box({
        width: '100%',
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: '#ad006e'
        },
        content: createText()
    })
})

const createText = (currentSong, volume = 1) => '\n\n'
    .concat(`{bold}Volume{/bold} [{#11A5AD-fg}{bold}${getVolumeBars(volume)}{/}]`)
    .concat(`\n{bold}Current Song{/bold}: ${currentSong || 'Press CTRL + A'}`)

const getVolumeBars = volume => Array.from(
    Array(Math.floor(volume * 10)))
    .reduce((acc, curr) => acc.concat('=='), '')
    .concat(
        Array.from(Array(10 - Math.floor(volume * 10))).reduce((acc, curr) => acc.concat('  '), '')
    )

export const updateControls = controls => (controls.box.content = createText(controls.currentSong, controls.volume))

export const updateColor = (controls, screen) => color => {
    controls.box.style.bg = color
    screen.render()
}
