/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const COURSES_FILE = path.join(__dirname, 'courses.json');
const ELECTIVE_FILE = path.join(__dirname, 'electives.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/courses', (req, res) => {
  try{
      fs.readFile(COURSES_FILE, (err, data) => {
          try{
              res.setHeader('Cache-Control', 'no-cache');
              res.json(JSON.parse(data));
          }catch (error){
              res.status(500);
              res.json(JSON.parse(error));
          }
      });
  } catch (error) {
      res.status(500);
      res.json(JSON.parse(error));
  }

});

app.get('/api/electives', (req, res) => {
    try{
        fs.readFile(ELECTIVE_FILE, (err, data) => {
            try{
                res.setHeader('Cache-Control', 'no-cache');
                res.json(JSON.parse(data));
            }catch (error){
                res.status(500);
                res.json(JSON.parse(error));
            }
        });
    }catch (error){
        res.status(500);
        res.json(JSON.parse(error));
    }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
