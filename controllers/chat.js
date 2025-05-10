const { join } = require('node:path');

const chat = (req ,res )=>{
 res.sendFile(join(__dirname , '..', 'index.html'))
}

module.exports = {chat}