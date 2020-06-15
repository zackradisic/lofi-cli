const fft = require('jsfft')

console.log(fft)
let buffers = []
const audioVisualizer = (stream, updateColor) => {
    stream.on('data', chunk => {
        // Do some stuff to interpolate the color from the frequency

        if (buffers.length === 512) {
            updateColor('#FFFF')
            buffers = []
            console.log('done')
        } else {
            buffers.push(chunk)
            const data = new fft.ComplexArray(512).map((value, i, n) => {
                value.real = (i > n / 3 && i < 2 * n / 3) ? 1 : 0
            })

            const frequencies = data.FFT()
            // Implement a low-pass filter using the in-place mapper.
            frequencies.map((frequency, i, n) => {
                if (i > n / 5 && i < 4 * n / 5) {
                    frequency.real = 0
                    frequency.imag = 0
                }
            })

            updateColor('#' + decimalToHexString(Math.pow(16, 6) / (frequencies.real['0'] * 1000)))
        }
    })
}

const decimalToHexString = number => {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1
    }
    return number.toString(16).toUpperCase()
}

export default audioVisualizer
