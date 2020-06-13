#!/usr/bin/env node
import playStream from './youtube-stream'
import initCLI from './cli'

const main = () => {
    const lofiStream = playStream()
    initCLI(lofiStream)
}

main()
