var inquirer = require("inquirer");
var axios = require('axios');
var generatehtml = require('./generateHTML')
var fs = require('fs');
var pdfdoc = require ('html-pdf');
var options = { format: 'Letter'};




const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your github username?"
      },
      {
        type: "list",
        name: "colour",
        message: "What is your favourite colour?",
        choices: [
            "green", 
            "blue", 
            "pink", 
            "red"
          ]
      },

];





function writeToFile(data) {
fs.writeFile('profile.html',generatehtml.generateHTML(data),err =>  {
    console.log("genrtae html successful")
    let newhtml = fs.readFileSync('./profile.html', 'utf8')
    pdfdoc.create(newhtml,options).toFile('pdfprofile.pdf', err =>{
        console.log('success')
    });
});

}

 




function init() {
    inquirer.prompt( questions).then( userData => {
        const queryUrl = `https://api.github.com/users/${userData.username}`
        
        axios.get(queryUrl).then(function(res) {
        
            Object.assign(userData, res.data);
            writeToFile(userData)
        });
            
        
        
        });
    }
init();
// "name": null,
// "company": null,
// "blog": "",
// "bio": null,
// "location": null,
// "public_repos": 13,
// "followers": 5,
// "following": 4,