function init_neopix () {
    segment = neopixel.create(DigitalPin.P2, 5, NeoPixelMode.RGB)
    segment.setBrightness(32)
    segment.showColor(neopixel.colors(NeoPixelColors.Black))
}
function countdown () {
    basic.showNumber(t)
    basic.pause(1000)
    t += -1
    if (t == 5) {
        radio.sendString("Fo")
    }
    if (t == 0) {
        state = 0
        feuV()
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendString("Sy")
})
function feuV () {
    segment.setPixelColor(4, neopixel.colors(NeoPixelColors.Black))
    segment.setPixelColor(3, neopixel.colors(NeoPixelColors.Black))
    segment.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    segment.show()
}
function feuO () {
    segment.setPixelColor(4, neopixel.colors(NeoPixelColors.Black))
    segment.setPixelColor(3, neopixel.colors(NeoPixelColors.Orange))
    segment.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
    segment.show()
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Fo") {
        feuO()
        basic.pause(2000)
        feuR()
        t = 20
        state = 1
    }
    if (receivedString == "Sy") {
        t = 7
        state = 1
    }
})
function feuR () {
    segment.setPixelColor(4, neopixel.colors(NeoPixelColors.Red))
    segment.setPixelColor(3, neopixel.colors(NeoPixelColors.Black))
    segment.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
    segment.show()
}
let t = 0
let segment: neopixel.Strip = null
let state = 0
radio.setGroup(10)
init_neopix()
state = 2
feuR()
basic.showLeds(`
    . . # . .
    . . # . .
    . . # . .
    . . . . .
    . . # . .
    `)
basic.forever(function () {
    if (state == 1) {
        countdown()
    }
})
