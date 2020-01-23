#!/usr/bin/env node

import { terminal } from 'terminal-kit'
import playStream from './youtube-stream'
import { Writable } from 'stream'

const main = async () => {
    terminal.green.bold('Playing ChilledCow stream...\n')
    playStream()
}


main()



