const express = require('express')
const app = express()
const bodyParser = require("body-parser")

const robots = {
    image: require("./robot/image.js"),
}

const {_PORT, _IMAGEPATH} = {
    "_PORT":"3000",
    "_IMAGEPATH":"content"
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/content', express.static('./content'))

app.post(["/", "/index"], async (req, res) => {
    var {userName, fileName, width, height, bgColor, textColor, textSize} = req.body

    var initialsLetters = userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0)

    var savingFileName = await robots.image(initialsLetters, fileName, width, height, bgColor, textColor, textSize)

    if(savingFileName.status == true){
        res.send(`${req.protocol}://${req.get('host')}/${_IMAGEPATH}/${savingFileName.return}`)
    }else{
        res.send({'Status': false, 'msg': 'Ocorreu um erro durante a execucao', 'error-description': savingFileName.return})
    }

});

app.listen(_PORT, function() {
    console.log(`App escutando na porta ${_PORT}!`)
})