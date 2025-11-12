(function () {
    try{
        rs.initiate({
            _id: "rs0",
            members: [{ _id: 0, host: "localhost:27017" }]
        })
        print("Replica set initiated")
    }catch(error){
        print("Error initiating replica set: " + error)
    }
})()