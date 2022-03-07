// const fs = require('fs')
const { readdir, stat, writeFile } = require('fs/promises')
const path = require('path')

const pathname = '../../public/image'
const cateObjs = []

async function test(){
  try {
    const files = await readdir(pathname)

    for ( const file of files ){
      // console.log(path.join(pathname, file));
      const data =  await stat(path.join(pathname, file))

      if ( data.isDirectory() ){
        const subFiles = await readdir(path.join(pathname, file))

        cateObjs.push({
          name: file,
          total: subFiles.length,
          children: subFiles.map(filename => path.join(pathname, file, filename)),
        })
      }
    }

    // console.log(cateObjs);
    writeFile('../../public/data.json', JSON.stringify(cateObjs))

  }catch(err){
    console.log(err);
  }
}

test()