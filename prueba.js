const fs = require('fs')
let log = ""
let logBytes=0;

fs.readFile("log.txt", 'utf8', (err, data) => {  //Leo el archivo Log.txt
    if (err) throw err;
    log += data;
    log = log.replace(("\n"),"") // Borro saltos de linea.
    log = log.replace(("\r"),"") // Borro saltos de linea.
    let arr = log.split("FN") //Uso el Marcador de fin para partir el string en cada comando y respuesta.
    arr = arr.filter(Boolean)
    console.log(arr)
    arr.map((e) => {
        if (e.slice(0, 2) == "RQ") {
            logBytes+=10;
            console.log("Comando" + e.slice(2, 4) + " " + e)
            console.log("ID: " + e.slice(2, 4))
            console.log("Pasos ejecutados: " + e.slice(6, 8))
            console.log("Direccion: " + e.slice(4, 6) + `(${e.slice(4, 6) == "AV" ? "Avance" : "Retroceso"})`)
        }
        if (e.slice(0, 2) == "RT") {
            logBytes+=8;
            console.log("Respuesta" + e.slice(2, 4) + " " + e)
            if (e.slice(4, 6) == "99") {
                console.log("Error en la respuesta con ID: " + e.slice(2, 4))
            }
            console.log("\n")
        }
    })
    console.log(` El numero de bytes del log es: ${logBytes}`)
    //Nota: no considero los saltos de linea como parte de los bytes del log, ya que no estaban en la tabla, pero bien deberian ser contados.
})
