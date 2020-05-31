const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')

const robots = {
    image: require("./robot/image.js"),
}

const {_PORT, _IMAGEPATH} = {
    "_PORT":"3000",
    "_IMAGEPATH":"content"
}

async function initializeRobotImage(
    req,
    userName,
    fileName,
    width,
    height,
    bgColor,
    bgGradientLength,
    textColor,
    textSize,
    fontFamily
){

    var initialsLetters = userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0)

    var savingFile = await robots.image(initialsLetters, fileName, width, height, bgColor, bgGradientLength,textColor, textSize, fontFamily)

    if(savingFile.status == true){
        return {'status':true, 'imageUrl':`${req.protocol}://${req.get('host')}/${_IMAGEPATH}/${savingFile.return}`}
    }else{
        return {'status': false, 'msg': 'Ocorreu um erro durante a execucao', 'error-description': savingFile.return}
    }

}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/content', express.static('./content'))

app.get("/perfil", async (req, res) => {
    var {userName, fileName, width, height, bgColor, bgGradientLength, textColor, textSize, fontFamily} = req.query
    var response = await initializeRobotImage(req, userName, fileName, width, height, bgColor, bgGradientLength, textColor, textSize, fontFamily)
    res.send(response)
})

app.post("/perfil", async (req, res) => {
    var {userName, fileName, width, height, bgColor, bgGradientLength, textColor, textSize, fontFamily} = req.body
    var response = await initializeRobotImage(req, userName, fileName, width, height, bgColor, bgGradientLength, textColor, textSize, fontFamily)
    res.send(response)
})

app.listen(process.env.PORT || _PORT, function() {
    console.log(`App escutando na porta ${_PORT}!`)
})