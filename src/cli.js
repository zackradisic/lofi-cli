#!/usr/bin/env node
import "regenerator-runtime/runtime";

import { terminal } from 'terminal-kit'
import playStream from './youtube-stream'

const main = async () => {
    terminal.green.bold('Playing ChilledCow stream...\n')
    playStream()
}


main()



