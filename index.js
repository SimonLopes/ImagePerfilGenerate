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

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/content', express.static('./content'))

app.get("/perfil", async (req, res) => {
    var {userName, fileName, width, height, bgColor, textColor, textSize} = req.query
    var initialsLetters = userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0)
    

    var savingFileName = await robots.image(initialsLetters, fileName, width, height, bgColor, textColor, textSize)

    if(savingFileName.status == true){
        res.send({'status':true, 'imageUrl':`${req.protocol}://${req.get('host')}/${_IMAGEPATH}/${savingFileName.return}`})
    }else{
        res.send({'status': false, 'msg': 'Ocorreu um erro durante a execucao', 'error-description': savingFileName.return})
    }
})

app.post("/perfil", async (req, res) => {
    var {userName, fileName, width, height, bgColor, textColor, textSize} = req.body
    var initialsLetters = userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0)
    width = parseInt(width)
    height = parseInt(height)
    textSize = parseInt(textSize)

    var savingFileName = await robots.image(initialsLetters, fileName, width, height, bgColor, textColor, textSize)

    if(savingFileName.status == true){
        res.send({'status':true, 'imageUrl':`${req.protocol}://${req.get('host')}/${_IMAGEPATH}/${savingFileName.return}`})
    }else{
        res.send({'status': false, 'msg': 'Ocorreu um erro durante a execucao', 'error-description': savingFileName.return})
    }

});

app.listen(process.env.PORT || _PORT, function() {
    console.log(`App escutando na porta ${_PORT}!`)
})