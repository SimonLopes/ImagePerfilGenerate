# ImagePerfilGenerate
ImagePerfilGenerate, is a standard profile image generator for users, images are generated according to the initials of the users names

## Creation
V 1.0.0
- [Símon Lopes](https://www.facebook.com/lopes.nom.is)

## Quick start
### For news requests

JSON request:

`URL: `http://image-perfil-generate.herokuapp.com/perfil

### Requests Params
|  Request name  | Request required | Type | Default value | Request description |
| ------------- | ------------- | ------------ | ------------ | ------------ |
|  [userName](#username)  |  Required  | String | null | User name for generate image |
|  [fileName](#filename)  | Not required  | String | Initials text user | Name for saving file (timestamp will always be added at the end) |
|  [width](#width)  | Not required  | Integer | 512 | Image width |
|  [height](#height)  | Not required  | Integer | 512 | Image height |
|  [bgColor](#bgcolor)  | Not required  | Array (hex or rgba) (only RGBA on GET request) | Random color generation | Color for background |
|  [bgGradientLength](#bggradientlength)  | Not required  | Integer | 1 | 
amount of colors in the gradient, if greater than the size of the background color array, missing colors will be generated automatically |
|  [textColor](#textcolor)  | Not required  | String (hex or rgba) (only RGBA on GET request) | Random color generation | Color for text (brightness set automatically) |
|  [textSize](#textsize)  | Not required  | Integer | width/2 | Text font size |
|  [fontFamily](#fontfamily)  | Not required  | String | 'BebasNeue' | Font of text |


### Basic exaple JSON and GET use

JSON:
```
{
  "userName":"Simon Lopes",
  "fileName": "output",
  "width": 300,
  "height": 200,
  "bgColor": ["#282c30"],
  "bgGradientLength": 1,
  "textColor": "#28a745",
  "textSize": 150,
  "fontFamily": "Arial"
}
```

GET:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Simon Lopes&fileName=output&width=300&height=200&bgColor[]=rgb(40,44,48)&bgGradientLength=1&textColor=rgb(40,167,69)&textSize=150&fontFamily=Arial`

`return`: $PROTOCOL://$URL:$PORT/$PATH/output-1590692469.png 

`generated image`:

![preview](https://i.ibb.co/QmJtrjn/output-1590692469.png)

## `userName`
`required`

JSON format:
```
{
  "userName": "Name User"
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User`

`Return`: "NU" (string)

## `fileName`
`not required`

`default:` $userName

JSON format:
```
{
	"userName":"Name User",
	"fileName": "output"
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&fileName=output`

`Return`: "output-1590692469.png" (string)

## `width`
`not required`

`default:` 512

JSON format:
```
{
	"userName":"Name User",
	"width": 300
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&width=300`

`Return`: 300 (int)

## `height`
`not required`

`default:` 512

JSON format:
```
{
	"userName":"Name User",
	"height": 300
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&height=300`

`Return`: 300 (int)

## `bgColor`
`not required`

`default:` randColor()

**ONLY RGB(A) COLOR FORMAT ON GET REQUEST**

JSON format:
```
{
	"userName":"Name User",
	"bgColor": ["#000"]
	//for gradient:
	//"bgColor": ["#000", "#fff"]
}

OR

{
	"userName":"Name User",
	"bgColor": ["rgba(0,0,0,1)"]
	//for gradient:
	//"bgColor": ["rgba(0,0,0,1)", "rgb(255,255,255)"]
	
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&bgColor[]=rgb(0,0,0)`

or

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&bgColor[]=rgb(0,0,0)&bgColor[]=rgb(255,255,255)`

`Return`: ["#000"] or ["#000", "#fff"] (Array)

## `bgGradientLength`
`not required`

`default:` 1

**if larger than the background color array size, missing colors will be generated automatically**

JSON format:
```
{
	"userName":"Name User",
	"bgGradientLength": 4
}

OR

{
	"userName":"Name User",
	"bgColor": ["#000"],
	"bgGradientLength": 3
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&bgColor[]=rgba(0,0,0,1)`

or

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&bgColor[]=rgb(0,0,0)&bgGradientLength=4`

`Return`: ["#000", randColor(), randColor(), randColor()] (Array)

## `textColor`

`not required`

`default:` `randColorText(randColor(), lightOrDark(bgColor))`

**ONLY RGB(A) COLOR FORMAT ON GET REQUEST**


JSON format:
```
{
	"userName":"Name User",
	"textColor": "#fff"
}

OR

{
	"userName":"Name User",
	"textColor": "rgba(255,255,255,1)"
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&textColor=rgba(255,255,255,1)`

`Return`: "#fff" (string)

## `textSize`
`not required`

`default:` $width/2

`measure:` `pt`

JSON format:
```
{
	"userName":"Name User",
	"textSize": 150
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&textSize=150`

`Return`: 150pt (int)

## `fontFamily`
`not required`

`default:` 'BebasNeue'

`list of fonts`: [fonts](./fonts)

**font names are the name of the file without the extension**

JSON format:
```
{
	"userName":"Name User",
	"fontFamily": "Arial"
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&fontFamily=Arial`

`Return`: "Arial" (string)

----------------------------------------
## Packages
- [canvas](https://github.com/Automattic/node-canvas)
- [fs](https://nodejs.org/api/fs.html)
- [express](https://github.com/expressjs/express)
  * [body-parser](https://github.com/expressjs/body-parser)
