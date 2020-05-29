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
|  [userName](#username)  |  Required  | string | null | User name for generate image |
|  [fileName](#filename)  | Not required  | string | Initials text user | Name for saving file (timestamp will always be added at the end) |
|  [width](#width)  | Not required  | integer | 512 | Image width |
|  [height](#height)  | Not required  | integer | 512 | Image height |
|  [bgColor](#bgcolor)  | Not required  | string (hex or rgba) (only RGBA on GET request) | Random color generation | Color for background |
|  [textColor](#textcolor)  | Not required  | string (hex or rgba) (only RGBA on GET request) | Random color generation | Color for text (brightness set automatically) |
|  [textSize](#textsize)  | Not required  | integer | width/2 | Text font size |
|  [fontFamily](#fontfamily)  | Not required  | string | 'BebasNeue' | Font of text |

### Basic exaple JSON and GET use

JSON:
```
{
  "userName":"Simon Lopes",
  "fileName": "output",
  "width": 300,
  "height": 200,
  "bgColor": "#282c30",
  "textColor": "#28a745",
  "textSize": 150,
  "fontFamily": "Arial"
}
```

GET:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Simon Lopes&fileName=output&width=300&height=200&bgColor=rgb(40,44,48)&textColor=rgb(40,167,69)&textSize=150&fontFamily=Arial`

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
	"bgColor": "#000"
}

OR

{
	"userName":"Name User",
	"bgColor": "rgba(0,0,0,1)"
}
```

GET format:

`http://image-perfil-generate.herokuapp.com/perfil?userName=Name User&bgColor=rgba(0,0,0,1)`

`Return`: "#000" (string)

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
