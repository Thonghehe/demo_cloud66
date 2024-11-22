var express = require('express');
var router = express.Router();
//MongoDB
//Cách kết nối, thao tác với MongoDB
const mongodb='mongodb+srv://thongnk21:Thong0362014553@cluster0.rw49m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose');
mongoose.connect(mongodb).then(()=>{
  console.log('Connected to MongoDB');
}).catch(err=>console.log(err));
/* GET home page. */
//Định nghĩa 1 collection trước
//schema là khái niệm để định nghĩa cấu trúc của 1 collection
//collection tên là student
const stdentSchema = new mongoose.Schema({
  name: String,
    address: String,
  age: String,
})
//Model: là khái niệm để thao tác với collection tên là student
const STUDENT = mongoose.model('student',stdentSchema);

router.get('/getDatabase',function (req,res) {
    //Lấy dữ liệu từ collection student
    STUDENT.find({}).then(result=>{
        res.send(result);
    }).catch(err=>console.log(err));
})
router.get('/createUser',function (req,res) {
  const ramdom = Math.floor(Math.random()*1000);

  const student = new STUDENT({
    name: 'Nguyen Thong' + ramdom,
    address: 'Ha Noi' +ramdom,
    age: '0362014553'+ramdom,
  })
    student.save().then(result=>{
        res.send(result);
    }).catch(err=>console.log(err));
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,message:'Được rồi'});
});

//định nghĩa các chức năng

router.get('/demo', function(req, res, next) {
  res.send('Hehehehehehehe');
});
router.get('/deleteUser', function(req, res) {
  const id = req.query.id
  STUDENT.deleteOne({_id:id}).then(result=>{
    res.redirect('/getAllUser');
  }).catch(err=>console.log(err));
});
router.get('/updateUser', function(req, res) {
  const id = req.query.id;
  STUDENT.findOne({_id:id}).then(result=>{
    res.render('updateForm',{data:result});
  }).catch(err=>console.log(err));
})
router.post('/updateUser', function(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const age = req.body.age;
  STUDENT.updateOne({_id:id},{name:name,address:address,age:age}).then(result=>{
    res.redirect('/getAllUser');
  }).catch(err=>console.log(err))});
router.get('/getAllUser', function(req, res) {
  //req: đối tượng chứa các tham số mà phía client gửi lên: trình duyệt, android, postman, ...
  //res: đối tượng kiểm soát cách giữ liệu được trả về cho client
  //trả về 1 file html, trả về 1 biến, trả về 1 array object, hay trả về 1 json data
  // var jsonData=[{
  //   id: 1,
  //   name: 'Nguyen Van A',
  //   age: 20
  // },
  //   {
  //     id: 2,
  //     name: 'Nguyen Van B',
  //     age: 22
  //   },{
  //     id: 3,
  //     name: 'Nguyen Van C',
  //     age: 25
  //   }
  // ]
  STUDENT.find({}).then(jsonData=>{
  res.json(jsonData);
  })
});
router.post('/createUser',function (req,res) {
  //Thuộc tinh sau biến body là thuộc tính trong thẻ input
  //req.body.name: lấy giá trị của thẻ input có thuộc tính name="name"
    //req.body.age: lấy giá trị của thẻ input có thuộc tính name="age"
  //ví dụ:
  //<input type="text" name="name">
  //<input type="text" name="age">
  const  name = req.body.name;
  const address = req.body.address;
  const age = req.body.age;
  const student = new STUDENT({
    name: name,
    address: address,
    age: age,
  })
  student.save().then(result=>{
    const ketqua = {
      errorCode:200,
      message:"Create car successfully"
    }
    res.send(ketqua);
  }).catch(err=>{
    const ketqua = {
      errorCode: 500,
      message: "Create car failed"
    }
    res.send(ketqua);
  });
})
router.get('/profile',function (req,res) {
  res.render('profile');
})
module.exports = router;
