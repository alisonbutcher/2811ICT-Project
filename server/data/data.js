// manages the data (currently a json file)
module.exports = function (fs, filename) {

    obj = {};
    this.getGroups = () => {

    };

    function readJSON() {
        fs.readFile('./data/data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            return data;
        });
    }

    function writeJSON() {
        fs.writeFile('./data/data.json', )
    }


    let obj = {};

    let jUsers;
    let jGroups;
    let jChannels;
    let jRoles;
    let jObj;

    function readFile(data) {
        fs.readFile('./data/data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            return data;
        });
    }

    let file = readFile();
    jObj = JSON.parse(file);

    if (jObj != null) {
        for(let i = 0; i < jObj.users.length; i++) {
            console.log(jObj.users[i]);
        }
    }






    // console.log(jObj);
    // for (let i = 0; i < jObj.users.length; i++) {
    //     console.log(jObj.users[i]);
    // }
    //
    // for (let i = 0; i < jObj.groups.length; i++) {
    //     console.log(jObj.groups[i]);
    // }



};

//
// fs.readFile('data.json', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         userObj = JSON.parse(data);
//         for (let i = 0; i < userObj.length; i++) {
//             console.log(userObj);
//             if (userObj[i].name == uname) {
//                 isUser = 1;
//             }
//         }
//     }
