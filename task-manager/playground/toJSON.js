const pet = {
    name : 'Hal',
    age: 5
}
pet.toJSON = function(){
    console.log(this)
    return {}
}

console.log(JSON.stringify(pet))