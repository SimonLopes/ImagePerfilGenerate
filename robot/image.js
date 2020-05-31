const { registerFont, createCanvas } = require('canvas')
const fs = require('fs')
const fonts = fs.readdirSync('./fonts/');

async function robot(
    textUser,
    fileName = textUser,
    width = 512,
    height = 512,
    bgColor = [randColor()],
    bgGradientLength = bgColor.length,
    textColor = randColorText(randColor(), lightOrDark(bgColor[0])),
    textSize = width/2,
    fontFamily = 'BebasNeue',
    
) {
    await loadFonts()
    await generateBackgroundColor(bgColor, bgGradientLength)
    var canvas = await generateImage(
        textUser,
        bgColor,
        textColor,
        parseInt(textSize),
        fontFamily,
        parseInt(width),
        parseInt(height)
    )
    return await saveImage(fileName, canvas)
}

function generateImage(text, bgColor, textColor, textSize, fontFamily, w, h) {
    var canvas = createCanvas(w, h)
    var context = canvas.getContext('2d')
    var grd = context.createLinearGradient(0, 0, w, h);

    for (let i = 0; i < bgColor.length; i++) {
        grd.addColorStop(1/bgColor.length*i, bgColor[i])
    }

    context.fillStyle = grd
    context.fillRect(0,0,w,h)

    context.font = `bold ${textSize}pt ${fontFamily}`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = textColor
    context.shadowColor = "rgba(0,0,0,1)";
    context.shadowBlur = 9;
    context.fillText(text, w/2, h/2)

    return canvas
}

function saveImage(name, canvas) {
    try {
        var outputFileName = `${name}-${Math.floor(Date.now() / 1000)}.png`
        var buffer = canvas.toBuffer('image/png')
        fs.writeFileSync(`./content/${outputFileName}`, buffer)
        return {'status': true, 'return': outputFileName}
    } catch (err) {
        return {'status': false, 'return': err}
    }
    
}

function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function lightOrDark(color) {
    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
        r = color[1]
        g = color[2]
        b = color[3]
    } 
    else {
        color = +("0x" + color.slice(1).replace( 
            color.length < 5 && /./g, '$&$&'
            )
        );
        r = color >> 16
        g = color >> 8 & 255
        b = color & 255
    }
    var hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    )
    return hsp > 127.5 ? 'light' : 'dark'
}

function randColorText(textColor, bgBright) {
    var pad = function(num, totalChars) {
        var pad = '0'
        num = num + ''
        while (num.length < totalChars) {
            num = pad + num
        }
        return num
    }
    
    var changeColor = function(color, ratio, darker) {
        color = color.replace(/^\s*|\s*$/, '')
        color = color.replace(
            /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
            '#$1$1$2$2$3$3'
        )
    
        var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
            rgb = color.match(new RegExp('^rgba?\\(\\s*' +
                '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                '\\s*,\\s*' +
                '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                '\\s*,\\s*' +
                '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                '(?:\\s*,\\s*' +
                '(0|1|0?\\.\\d+))?' +
                '\\s*\\)$'
            , 'i')),
            alpha = !!rgb && rgb[4] != null ? rgb[4] : null,
            decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
                /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
                function() {
                    return parseInt(arguments[1], 16) + ',' +
                        parseInt(arguments[2], 16) + ',' +
                        parseInt(arguments[3], 16)
                }
            ).split(/,/),
            returnValue
        return !!rgb ?
            'rgb' + (alpha !== null ? 'a' : '') + '(' +
                Math[darker ? 'max' : 'min'](
                    parseInt(decimal[0], 10) + difference, darker ? 0 : 255
                ) + ', ' +
                Math[darker ? 'max' : 'min'](
                    parseInt(decimal[1], 10) + difference, darker ? 0 : 255
                ) + ', ' +
                Math[darker ? 'max' : 'min'](
                    parseInt(decimal[2], 10) + difference, darker ? 0 : 255
                ) +
                (alpha !== null ? ', ' + alpha : '') +
                ')' :
            [
                '#',
                pad(Math[darker ? 'max' : 'min'](
                    parseInt(decimal[0], 10) + difference, darker ? 0 : 255
                ).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](
                    parseInt(decimal[1], 10) + difference, darker ? 0 : 255
                ).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](
                    parseInt(decimal[2], 10) + difference, darker ? 0 : 255
                ).toString(16), 2)
            ].join('')
    }
    var lighterColor = function(color, ratio) {
        return changeColor(color, ratio, false)
    };
    var darkerColor = function(color, ratio) {
        return changeColor(color, ratio, true)
    };
    
    return bgBright == 'dark' ? lighterColor(textColor, .2) : darkerColor(textColor, .2)
}

function loadFonts(){
    for (let i = 0; i < fonts.length; i++) {
        registerFont(`./fonts/${fonts[i]}`, {family: `${fonts[i].split('.')[0]}`})        
    }
    
}

function generateBackgroundColor(bgColor, bgGradientLength){
    for (let i = 0; i < bgGradientLength; i++) {
        if(!bgColor[i]){
            bgColor.push(randColor())
        }
    }
}

module.exports = robot