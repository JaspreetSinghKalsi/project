var application_root = __dirname,
    express = require("express"),
	  mysql = require('mysql2');
    path = require("path");

var app = express();

var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '123',
database: "GGSSC"
});

app.use(express.bodyParser());
app.use(express.cookieParser('shhhh, very secret'));
app.use(express.session());

// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.all('/*', function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



app.get('/getSikhHistory', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT * from gurus', function(err, rows) {
       console.log('Sikhhistory');
      res.json(rows);
  });
});



app.get('/getBullet', function(req, res){
  res.setHeader('Content-Type', 'application/json');
    connection.query('select text from bullet order by time DESC;', function(err, rows) {
    res.json(rows);  
  });
});

app.get('/getBabaBandaJi5Jarnails', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT * from jarnails', function(err, rows) {
       console.log('BababandaSinghJI');
      res.json(rows);
  });
});

app.get('/getSahizade', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT * from sahibzades', function(err, rows) {
       console.log('Sahibzade');
      res.json(rows);
  });
});

app.get('/gettakhatsHistory', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT * from takhats', function(err, rows) {
      console.log('Thakats');
      res.json(rows);
  });
});

app.get('/getcontacts', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT * from contact order by c_time desc', function(err, rows) {
      res.json(rows);
  });
});

app.get('/getNoticeboard', function(req, res){
 res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT src ,title,text_area,hrs,min,year,month,days from noticepicture order by curr_time desc', function(err, rows) {
       
      res.json(rows);
  });
});

app.get('/getEventboard', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT src ,title,hrs,min,year,month,days from eventpicture order by cur_time desc;', function(err, rows) {
    
      res.json(rows);
  });
});
 

app.get('/getVideoboard', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var responseJSON = [];
    connection.query('SELECT src ,title,hrs,min,year,month,days from eventvideos order by cur_time desc;', function(err, rows) {
    
      res.json(rows);
  });
});
 
// Posting contents of contact div

app.post('/insertcontact', function (req, res){
  var  c_time = 'now()';
  var nowe = new Date();
    console.log(nowe);
    var year    = nowe.getFullYear();
    var month   = nowe.getMonth(); 
    var day   = nowe.getDate();
    var hour    = nowe.getHours();
    var minute  = nowe.getMinutes();
    var second  = nowe.getSeconds();
    title = req.body.name;
    email = req.body.email;
    message = req.body.comments;
    var mon;
    if(month == 0)
      {
        mon = 'JAN';
      }
     else if(month == 1)
     {
      mon = 'FEB';
    }
     else if(month == 2)
    {
      mon = 'MAR';
    }
    else if(month == 3)
    {
      mon = 'APR';
    }
     else if(month == 4)
    {
      mon = 'MAY';
    }
    else  if(month == 5)
    {
      mon = 'JUN';
    }
      else if(month == 6)
    {
      mon = 'JUL';
    }
     else  if(month == 7)
    {
      mon = 'AUG';
    }
      else if(month == 8)
    {
      mon = 'SEP';
    }
      else if(month == 9)
    {
      mon = 'OCT';
    }
     else if(month == 10)
    {
      mon = 'NOV';
    }
    else
    {
      mon = 'DEC';
    }
   console.log('insert into contact values (' + "'" + title +"'" +',' + "'"+ email +"'" +',' + "'"+ message +"'" +',' + day +
    ','+"'" + mon  +"'"+',' + year  +',' + hour  +',' + minute +',' + second +',' + c_time  +');');
  connection.query('insert into contact values (' + "'" + title +"'" +',' + "'"+ email +"'" +',' + "'"+ message +"'" +',' + day +
    ',' + "'"+ mon + "'" +',' + year  +',' + hour  +',' + minute +',' + second +',' + c_time  +');', function (error, rows, fields) { 
    console.log(error);
         res.writeHead(200, {'Content-Type': 'text/plain'});

      // res.end( 'record inerted...');
          }); 
});


/// Include the node file module
var fs = require('fs');
var imageName;


app.get('/uploads/fullsize/:file', function (req, res){
  file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');

});


/// Post files of Notice Div
app.post('/UploadNoticePic', function(req, res) {

  var nowe = new Date();
   console.log(nowe);
    var year    = nowe.getFullYear();
    var month   = nowe.getMonth(); 
    var day   = nowe.getDate();
    var hour    = nowe.getHours();
    var minute  = nowe.getMinutes();
    var second  = nowe.getSeconds();
  
    
   console.log('Year :  ' + year);
    console.log('Month : ' + month);
     console.log('Day : ' + day);
    console.log('Hour : ' + hour);
    console.log('Min : ' + minute);
    console.log('Sec : ' + second);
    var mon;
    if(month == 0)
      {
        mon = 'JAN';
      }
     else if(month == 1)
     {
      mon = 'FEB';
    }
     else if(month == 2)
    {
      mon = 'MAR';
    }
    else if(month == 3)
    {
      mon = 'APR';
    }
     else if(month == 4)
    {
      mon = 'MAY';
    }
    else  if(month == 5)
    {
      mon = 'JUN';
    }
      else if(month == 6)
    {
      mon = 'JUL';
    }
     else  if(month == 7)
    {
      mon = 'AUG';
    }
      else if(month == 8)
    {
      mon = 'SEP';
    }
      else if(month == 9)
    {
      mon = 'OCT';
    }
     else if(month == 10)
    {
      mon = 'NOV';
    }
    else
    {
      mon = 'DEC';
    }
    console.log(mon);

  fs.readFile(req.files.NoticePic.path, function (err, data) {


    var imageName = req.files.NoticePic.name;
    var title = req.body.title;
    var text_area = req.body.desc;
  
   

    /// If there's an error
    if(!imageName){
      console.log("There was an error");
      res.redirect("/");
      res.end("Sorry!!! There is some Error....");

    } else {
      var newPath = __dirname + "/uploads/fullsize/" + imageName;
      console.log("this is up...");
      console.log(imageName);
      /// write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {
       });
      console.log("POST: ");
      var PictureSource =  "/uploads/fullsize/" + imageName ;
    

  c_time = 'now()';
    
  console.log('insert into noticepicture values (' + "'" + PictureSource +"'" +',' + "'"+ title +"'" +',' + "'"+ text_area +"'" +',' +c_time +',' + "'"+ hour +"'" +',' + "'"+ minute +"'" +',' + "'"+ year+"'" +',' + "'"+ mon +"'" +',' + "'"+ day +"'" +');');
  connection.query('insert into noticepicture values (' + "'" + PictureSource +"'" +',' + "'"+ title +"'" +',' + "'"+ text_area +"'" +',' + c_time  +',' + "'"+ hour +"'" +',' + "'"+ minute +"'" +',' + "'"+ year +"'" +',' + "'"+ mon +"'" +',' + "'"+ day +"'" +');', function (error, rows, fields) { 
    console.log(error);
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end("Notice is created... :)");
         // res.redirect('http://127.0.0.1/Guru%20Gobind%20Singh%20Ji%20Site/Admin-Panel/admin.html');
          }); 
    }
  });


});




/// Post files of Event Div
app.post('/UploadEventPic', function(req, res) {

  var nowe  = new Date();
   console.log(nowe);
    var year    = nowe.getFullYear();
    var month   = nowe.getMonth(); 
    var day   = nowe.getDate();
    var hour    = nowe.getHours();
    var minute  = nowe.getMinutes();
    var second  = nowe.getSeconds();
    
    console.log('Year :  ' + year);
    console.log('Month : ' + month);
     console.log('Day : ' + day);
    console.log('Hour : ' + hour);
    console.log('Min : ' + minute);
    console.log('Sec : ' + second);
    var mon;
    if(month == 0)
      {
        mon = 'jan';
      }
     else if(month == 1)
     {
      mon = 'feb';
    }
     else if(month == 2)
    {
      mon = 'Mar';
    }
    else if(month == 3)
    {
      mon = 'apr';
    }
     else if(month == 4)
    {
      mon = 'may';
    }
    else  if(month == 5)
    {
      mon = 'jun';
    }
      else if(month == 6)
    {
      mon = 'jul';
    }
     else  if(month == 7)
    {
      mon = 'aug';
    }
      else if(month == 8)
    {
      mon = 'sep';
    }
      else if(month == 9)
    {
      mon = 'oct';
    }
     else if(month == 10)
    {
      mon = 'nov';
    }
    else
    {
      mon = 'dec';
    }
    console.log(mon);
   
  fs.readFile(req.files.EventPic.path, function (err, data) {

    var imageName = req.files.EventPic.name;
    var title = req.body.title;
    var text_area = req.body.desc;
   
  
    

    /// If there's an error
    if(!imageName){
      console.log("There was an error");
      res.redirect("/");
      res.end("Sorry!!! There is some Error....");

    } else {
      var newPath = __dirname + "/uploads/Eventsfullsize/" + imageName;
      console.log("this is up...");
      console.log(imageName);
      /// write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {
       });
      console.log("POST: ");
      var PictureSource =  "/uploads/Eventsfullsize/" + imageName ;
      c_time = 'now()';
    
  console.log('insert into eventpicture values (' + "'" + PictureSource +"'" +',' + "'"+ title +"'" + ',' + c_time +',' + "'"+ hour +"'" +',' + "'"+ minute +"'" +',' + "'"+ year+"'" +',' + "'"+ mon +"'" +',' + "'"+ day +"'" +');');
  connection.query('insert into eventpicture values (' + "'" + PictureSource +"'" +',' + "'"+ title +"'"  +',' + c_time  +',' + "'"+ hour +"'" +',' + "'"+ minute +"'" +',' + "'"+ year +"'" +',' + "'"+mon +"'" +',' + "'"+ day+"'" +' );', function (error, rows, fields) { 
    console.log(error);
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end("Event is created... :)");
          }); 
    }
  });


});

// Admin Panel

function restrict(req, res, next) {
  console.log('here at restrict');
  if (req.session.user) {

    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}
 
app.get('/', function(request, response) {
   response.send('This is the homepage');
});
 

 
app.post('/login', function(request, response) {
    var username = request.body.name;
    var password = request.body.passwords;
    var hash = require('crypto').createHash('md5').update(password).digest("hex");
    // console.log(username);
    // console.log(hash);
    var user;
    var pword;
    connection.query('SELECT * from passwrd', function(err, rows) {
    console.log('.........................');
    user = rows[0].userid;
    pword= rows[0].password;
    console.log(username);
    console.log(hash);
    console.log('------------------------------');
    console.log(user);
    console.log(pword);
    if(username == user  && hash == pword)
    {
        request.session.regenerate(function(){
        request.session.user = username;
        response.redirect('http://127.0.0.1/Guru%20Gobind%20Singh%20Ji%20Site/Admin-Panel/admin.html');
        

        });
    }
    else {
       response.redirect('http://127.0.0.1/Guru%20Gobind%20Singh%20Ji%20Site/Admin-Panel/error.html');
    }
 });
});
 
app.get('/logout', function(request, response){
    request.session.destroy(function(){
         response.redirect('http://127.0.0.1/Guru%20Gobind%20Singh%20Ji%20Site/Admin-Panel/index.html');
    });
});
 
app.get('/restricted', restrict, function(request, response){
  // console.log(request);
  // console.log(response);
  var capture = { responce: 'pass'};
   catchjson = JSON.stringify(capture);
   // response.send(catchjson);
   response.redirect('http://127.0.0.1/Guru%20Gobind%20Singh%20Ji%20Site/Admin-Panel/admin.html');
  // response.send('This is the restricted area! Hello ' + request.session.user + '! click <a href="/logout">here to logout</a>');
});





app.post('/ChangeUseridPassword', function(request, response) {
    var username = request.body.name;
    var password = request.body.passwords;
    var hash = require('crypto').createHash('md5').update(password).digest("hex");
    console.log('update passwrd set userid =' + "'" +username +"'" +',' + " password = '"+ hash +"' where id=1;");
    connection.query('update passwrd set userid =' + "'" + username +"'" +',' + " password = '"+ hash +"' where id=1;", function (error, rows, fields) { 
   
  });
    response.redirect('http://127.0.0.1/Guru%20Gobind%20Singh%20Ji%20Site/Admin-Panel/admin.html');
});

 




 /// Post files of Event Videos
app.post('/UploadEventVideos', function(req, res) {

  var nowe  = new Date();
   console.log(nowe);
    var year    = nowe.getFullYear();
    var month   = nowe.getMonth(); 
    var day   = nowe.getDate();
    var hour    = nowe.getHours();
    var minute  = nowe.getMinutes();
    var second  = nowe.getSeconds();
    
    console.log('Year :  ' + year);
    console.log('Month : ' + month);
     console.log('Day : ' + day);
    console.log('Hour : ' + hour);
    console.log('Min : ' + minute);
    console.log('Sec : ' + second);
    var mon;
    if(month == 0)
      {
        mon = 'jan';
      }
     else if(month == 1)
     {
      mon = 'feb';
    }
     else if(month == 2)
    {
      mon = 'Mar';
    }
    else if(month == 3)
    {
      mon = 'apr';
    }
     else if(month == 4)
    {
      mon = 'may';
    }
    else  if(month == 5)
    {
      mon = 'jun';
    }
      else if(month == 6)
    {
      mon = 'jul';
    }
     else  if(month == 7)
    {
      mon = 'aug';
    }
      else if(month == 8)
    {
      mon = 'sep';
    }
      else if(month == 9)
    {
      mon = 'oct';
    }
     else if(month == 10)
    {
      mon = 'nov';
    }
    else
    {
      mon = 'dec';
    }
    console.log(mon);
   
  fs.readFile(req.files.EventVideos.path, function (err, data) {

    var imageName = req.files.EventVideos.name;
    console.log(imageName);
    var title = req.body.title;
    var text_area = req.body.desc;
   
  
    

    /// If there's an error
    if(!imageName){
      console.log("There was an error");
      res.redirect("/");
      res.end("Sorry!!! There is some Error....");

    } else {
      var newPath = __dirname + "/uploads/Videos/" + imageName;
      console.log("this is up...");
      console.log(imageName);
      /// write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {
       });
      console.log("POST: ");
      var PictureSource =  "/uploads/Videos/" + imageName ;
      c_time = 'now()';
    
  console.log('insert into eventvideos values (' + "'" + PictureSource +"'" +',' + "'"+ title +"'" + ',' + c_time +',' + "'"+ hour +"'" +',' + "'"+ minute +"'" +',' + "'"+ year+"'" +',' + "'"+ mon +"'" +',' + "'"+ day +"'" +');');
  connection.query('insert into eventvideos values (' + "'" + PictureSource +"'" +',' + "'"+ title +"'"  +',' + c_time  +',' + "'"+ hour +"'" +',' + "'"+ minute +"'" +',' + "'"+ year +"'" +',' + "'"+mon +"'" +',' + "'"+ day+"'" +' );', function (error, rows, fields) { 
    console.log(error);
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end("Videos  is Uploaded ... :)");
        
          }); 
    }
  });


});




app.post('/UploadBullet', function(req, res) {
    var bullet = req.body.bullet;
    var time  = new Date();
    console.log("insert into bullet values("+"'"+bullet+"'"+","+"'"+time+"'"+");");
    connection.query("insert into bullet values("+"'"+bullet+"'"+","+"'"+time+"'"+");", function (error, rows, fields) { 
       if (error) {
            res.json({type: false, data: error});
        } else {
              
            res.json({type: true, data: JSON.stringify(rows)});    
            
            console.log(JSON.stringify(rows));
        }
  });
    
});


var port = Number(process.env.PORT || 5000);

 // Launch server
app.listen(port, function(){
    console.log('Server is running...');
});

;

