#!/usr/bin/env node

import { terminal } from 'terminal-kit'
import playStream from './youtube-stream'

const main = () => {
    terminal.green.bold('Playing ChilledCow stream...\n')
    playStream()
}

main()
