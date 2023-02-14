const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()

//define paths for Express config
const publicDirPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res)=>{
    res.render('index.hbs', {
        title:'Weather App',
        name:"Ari"
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:"About me",
        name:"Ari"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helptext:"This is some helpful text",
        title:"Help",
        name:"Ari"
    })
})


app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address, (error,data)=>{
        if (error || (data===undefined)){
            return res.send({
                error:"Error in geocoding"}
                )
        }
    
        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if (error || (forecastdata===undefined)){
                return res.send({
                    error:"Error in forecasting"}
                    )
            }
            
            res.send({
                temperature: forecastdata.temperature,
                location: data.location,
                feelslike: forecastdata.feelsLike
            })
        }) 
    })

    // res.send({
    //     forecast:"Misty",
    //     location:"Kolkata",
    //     address: req.query.address
    // })
})

app.get ('/products', (req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:"404",
        name:"Ari",
        errorMessage:"Help article not found"
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:"404",
        name:"Ari",
        errorMessage:"Page not found"
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})