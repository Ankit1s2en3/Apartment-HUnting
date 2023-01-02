const aphunt = require('./Solution')

blocks = [
    {
        "gym": false,
        "school": true,
        "store": false,
    },
    {
        "gym": true,
        "school": false,
        "store": false,
    },
    {
        "gym": true,  
        "school": true,
        "store": false,
    },
    {
        "gym": false,
        "school": true,
        "store": false,
    },
    {
    "gym": false,
    "school": true,
    "store": true,
    }
    ]

reqs = ["gym", "school", "store"]

var min_idx = aphunt.apartmentHunting(blocks,reqs)

console.log('minimum index : '+min_idx)