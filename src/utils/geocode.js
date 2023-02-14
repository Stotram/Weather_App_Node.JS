const request= require("postman-request")

const geocode=(address,callback)=>{
    const url="http://api.positionstack.com/v1/forward?access_key=f49aa18eec1687c3ccefd689a717ae02&query=" + encodeURIComponent(address);

    request({
        url:url,
        json:true
    }, (error,response)=>{
        if (error){
            callback('Unable to connect to location services !', undefined)
        }
        else if (response.body.error  || response.body.data[0]===undefined){
            callback('Unable to find location, please try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                location: response.body.data[0].name
            })
        }
    })
}

module.exports=geocode