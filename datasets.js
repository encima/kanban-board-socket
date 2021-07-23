let uid = require('uid');
module.exports = {
    

    basic: [ {id: uid.uid(), name:'Backlog', cards:[]},
    {id: uid.uid(), name: 'Next In', cards:[]},
    {id: uid.uid(), name: 'In Progress', cards:[]},
    {id: uid.uid(), name: 'Blocked', cards:[]},
    {id: uid.uid(), name: 'Ready for Review', cards:[]},
    {id: uid.uid(), name: 'Done', cards:[]}],

    exOne: [ {id: uid.uid(), name:'Backlog', cards:[
        {name: "Do a thing", priority: 3, estimate: 2}
    ]},
    {id: uid.uid(), name: 'Next In', cards:[]},
    {id: uid.uid(), name: 'In Progress', cards:[]},
    {id: uid.uid(), name: 'Blocked', cards:[]},
    {id: uid.uid(), name: 'Ready for Review', cards:[]},
    {id: uid.uid(), name: 'Done', cards:[]}]


    
};