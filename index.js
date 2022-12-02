const express = require('express')
const app = express()

const fs = require ('fs')


/* CLASE Contenedor */

class Contenedor {

  constructor( file ) {
      this.file = file
  }

  
  async getAll() {
    try{
      const objects = await fs.promises.readFile( this.file, 'utf-8')
      return JSON.parse(objects)

    } catch(err) {
      console.log(`Se produjo el siguiente error: ${err}`)
    }
  }
 
  
  async saveFile ( file, objects ) {
    try {
      await fs.promises.writeFile(
        file, JSON.stringify( objects, null, 2 )
        )
    } catch(err) {
      console.log(`Se produjo el siguiente error: ${err}`)
    }
  }


  async save( object ) {
    const objects = await this.getAll()
    try{
        let idNew
        objects.length === 0 
          ? idNew = 1
          : idNew = objects[ objects.length - 1 ].id + 1
        
        const objectNew = { id: idNew, ...object }       
        objects.push(objectNew)        
        await this.saveFile(this.file, objects)
        return idNew

    } catch(err) {
      console.log(`Se produjo el siguiente error: ${err}`)
    }
  }


  async getById( id ) {
    const objects = await this.getAll()
    try {
      const object = objects.find( ele => ele.id === id)
      return object ? object : null

    } catch(err) {
      console.log(`Se produjo el siguiente error: ${err}`)
    }
  }


  async deleteById( id ) {
    let objects = await this.getAll()
    
    try {
      objects = objects.filter( ele => ele.id != id )
      await this.saveFile( this.file, objects)
    
    } catch(err) {
      console.log(`Se produjo el siguiente error: ${err}`)
    }
  }


  async deleteAll() {
    await this.saveFile(this.file, [])
  }

}
/* ******************Fin CLASE Contenedor***************** */

const productos = new Contenedor('productos.txt')


app.get('/productos', (req, res) => {
    const obtenerProductos = async() => {
        try {
            let arrayProductos = await productos.getAll()
            res.send(arrayProductos)    
        } 
        catch (err) {
            console.log(err)
        }
    }
    obtenerProductos()
})

app.get('/productoRandom', (req, res) => {
  const obtenerProducto = async() => {
    try {
        let arrayProductos = await productos.getAll()
        const randomId = 1 + Math.trunc(Math.random() * arrayProductos.length) 
        //console.log("Id: "+ randomId)
        let producto = await productos.getById(randomId)
        res.send(producto)    
    } 
    catch (err) {
        console.log(err)
    }
  }
  obtenerProducto()
    
})

const PORT = 8080
app.listen(PORT, console.log(`Listening on port ${PORT}` ))