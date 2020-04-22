module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/glory-of-kings', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('数据库连接成功了'))
  .catch(err => console.log(err))
  
}