
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


function deptMenu(req, res, next){
	var dbRequest = "SELECT deparment_name, department_id FROM DEPARTMENT";
 	connection.connect(function (err) {

		 connection.query(dbRequest, function(err, row){
    if(err) throw err;
row = JSON.stringify(row);
      row = JSON.parse(row);
          	console.log(row);
    
    req.department_id = row;
       
    	 next();
        }
        )}
        
        )};
        
        function subjMenu(req, res, next){
	var dbRequest = "SELECT course_subject_description, department_id FROM COURSE_SUBJECT";
 	connection.connect(function (err) {

		 connection.query(dbRequest, function(err, row){
    if(err) throw err;
row = JSON.stringify(row);
      row = JSON.parse(row);
          	console.log(row);
    
    req.course_subject_description = row;
       
    	 next();
        }
        )}
        )};
        
  function courseMenu(req, res, next){
	var dbRequest = "SELECT course_id,COURSE_SUBJECT_id FROM COURSE WHERE COURSE_SUBJECT_id=14";
	
		connection.query(dbRequest, function(err, row) {

	    if(err) throw err;
	    
	        req.course_id = row;
	    
    	 next();
        }
       )};      
        
  function renderPage(req, res){
  
  res.render('majorReqmts', {
  data1: req.department_id,
  data2: req.course_id,
  data3: req.course_subject_description
  });
  
  
  
  }
  application.get('/', deptMenu, subjMenu, courseMenu, renderPage);
        
			
 
application.get("*", function (req, res) {
  res.send("Page not found");
});

application.listen(8000, function () {
  console.log("Running on port 8000");
});      
