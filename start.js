// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/moviepass/');
// mongoose.Promise = global.Promise;
// require('./models/theater');
// mongoose
//     .connection
//     .on('error', (err) => {
//         console.error(`mongoose error: ${err.message}`)
//     })

const app = require('./server');
app.set('port', 3001);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
})
