# lofi-cli
`npm install -g lofi-cli` 

Plays ChilledCow's lofi hip-hop [livestream](https://www.youtube.com/watch?v=hHW1oY26kxQ) from the terminal.

### Why?
If you're a student then you're likely listening to the ChilledCow lofi livesteam on YouTube while you study. 

However, performance becomes an issue, especially if you have multiple browser tabs or programs running on your computer, because a lot of resources are allocated to other features involved with the browser. 

lofi-cli simply streams only the audio from the livestream, and pipes it to your machine's output. 

### Usage
After installation, simply run the command `lofi` in a terminal window. Press `CTRL + C` to kill the program.

### Prerequisites
* [ffmpeg](https://github.com/FFmpeg/FFmpeg) - for converting m4a audio files to mp3

### OS Support
lofi-cli supports all platforms. OS specific problems will likely be related to the library used to play audio: [node-speaker](https://github.com/TooTallNate/node-speaker)

