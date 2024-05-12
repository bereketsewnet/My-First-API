const express = require('express');

const app = express();

// to use body parameter
app.use(express.json());

// PORT set daynamical
const port = process.env.port || 3000;
app.listen(port, ()=> console.log('listening on port ' + port));

// smample course collection object array b/c we dont have database for now
const course = [
  {id:1, name:'course 1'},
  {id:2, name:'course 2'},
  {id:3, name:'course 3'},
  {id:4, name:'course 4'},
  {id:5, name:'course 5'},
];
//        GET METHOD
// home page display first time this
app.get('/', (req, res) => {

    res.send('hello world is coming to postman');
});

// to get all courses in the list of object
app.get('/api/courses', (req, res) => {
 
    res.send(course);
});

// to get spasfic course by using courseId
app.get('/api/courses/:courseId', (req, res) => {

    const co = course.find(i => i.id === parseInt(req.params.courseId));
    if(!co) res.status(404).send('The Course with the given Id was not found');

    res.send(co);
});


//           POST METHOD
// to add new course in the arrary of object
app.post('/api/courses/', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){

        res.status(400).send('Name is reqired and must have greather than 3 world!!');
        return;
    }

    const newCourse = {id: course.length + 1, name: req.body.name};
    course.push(newCourse);

   res.send(newCourse);
});

//          PUT METHOD
// update the couse uing couseId
app.put('/api/courses/:courseId', (req, res) =>{
    // check if course if found store in eachcorse variable
    const eachCourse = course.find(i => i.id === parseInt(req.params.courseId));

    // if echaCourse var is empty it will retun this
    if(!eachCourse) {
        res.status(404).send('The course not found by this Id' + req.params.courseId);
        return;
    }

    // validating the body 
    if(!req.body.name || req.body.name.length < 3 || !req.params.courseId){

        res.status(400).send('Bad input');
        return;
    }

    // updateing the reslut
    eachCourse.name = req.body.name;
    // resposing updating course
    res.send(eachCourse);

});

//    DELETE METHOD
// deleting course by given id
app.delete('/api/courses/:id', (req, res) => {
  // to look up the course and return error message to client

  const getCourse = course.find(i => i.id === parseInt(req.params.id));
  if(!getCourse){
    res.status(404).send('the course not found!');
    return;
  }

 // delete the couse
const index = course.indexOf(getCourse);
course.splice(index, 1);

// response deleted couse
res.send(getCourse);


});
