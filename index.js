const express = require('express')

const app = express()
const PORT = 5000

app.get('/', function(request,response){
    response.send('Ini halaman utama')
})

app.get('/beranda', function(request,response){
    response.send('Beranda')
})

app.listen(PORT, function(){
    console.log(`Server starting on PORT: ${PORT}`)
})