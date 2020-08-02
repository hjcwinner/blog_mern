const mongoose = require('mongoose')

mg_Option = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose
.connect(process.env.MONGODB_URI, mg_Option)
.then(() => console.log('mongodb connected...'))
.catch(err => console.log(err.message))