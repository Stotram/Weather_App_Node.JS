const request = require ("postman-request")

const forecast= (latitude, longitude, callback)=>{

    const url="http://api.weatherstack.com/current?access_key=0d0b5dee472430a9cb34609d65f76ce2&query=" + latitude + "," + longitude + '&units=m';
    request ({
        url:url,
        json:true
    }, (error,response)=>{
        if (error){
            callback("Unable to connect", undefined)
        }
        else if (response.body.error){
            callback("Unable to proceed with forecast, try later", undefined)
        }
        else {
            const data={
                temperature:response.body.current.temperature,
                feelsLike:response.body.current.feelslike
            }
            callback(undefined,data)
        }
    })
}

module.exports= forecast