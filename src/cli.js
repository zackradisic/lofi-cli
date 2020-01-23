#!/usr/bin/env node

import { terminal } from 'terminal-kit'
import playStream from './youtube-stream'

const main = async () => {
    terminal.green.bold('Playing ChilledCow stream...\n')
    playStream()
}


main()



