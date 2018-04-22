/*navigate to home page*/
var express = require('express');
var application = express();
var mysql = require('mysql');
application.set('view engine', 'ejs');
application.use('/LayoutScript', express.static("LayoutScript"));
//application.use(express.static(__dirname + "/views"));
application.use(express.static(__dirname + "/public"));



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'degPlanDB'
});




//homepage
application.get("/", function (req, res) {
var q = "SELECT COURSE.course_id, COURSE.credit_hours, COURSE.TCCNS, COURSE_SUBJECT.COURSE_SUBJECT_id FROM COURSE INNER JOIN COURSE_SUBJECT ON COURSE.COURSE_SUBJECT_id = 14 ORDER BY COURSE_SUBJECT_id";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(q, function (err, result) {
      if (err) throw err;
      result = JSON.stringify(result);
      result = JSON.parse(result);
      //console.log(result);
      res.render("majorReqmts", { data: result });
    });  
  });

});





 
application.get("*", function (req, res) {
  res.send("Error");
});

application.listen(8000, function () {
  console.log("Running on port 8000");
});      
