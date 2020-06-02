const fs = require('fs')
let components = []
mread('./public/images');
console.log(JSON.stringify(components));

function mread(path){
    const files = fs.readdirSync(path)
    files.forEach(function (item, index) {
        let stat = fs.lstatSync(`${path}/${item}`)
        if (stat.isDirectory() === true) { 
            mread(`${path}/${item}`);
        }else{
            components.push(item)
        }
    })
}