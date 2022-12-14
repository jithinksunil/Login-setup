const express=require('express')
const app=express()
const sessions=require('express-session')


app.set('view engine','ejs')//seiting up  view engine

app.use(express.urlencoded({extended:true}))//to get data from post method

//session setup
app.use(sessions({
    resave:true,//to resave the session
    saveUninitialized:true,
    secret:'khfihuifgyscghi6543367567vhbjjfgt45475nvjhgjgj+6+9878', //random hash key string to genarate session id     
}))


//cookie setup
// app.use(cookieParser())

// //cache setup
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});



let password=true
app.get('/',(req,res)=>{
    if(req.session.randomword ){
        res.redirect('/profile')
    }
    else if (password){
    res.render('loginPage',{passData:password})
    
    }
    else if(!password){
        res.render('loginPage',{passData:password})
    }
})
const user={
    email:'jithinksunil96@gmail.com',
    password:'12345',
    emailTwo:'jithinksunil1996@gmail.com'
} 
app.post('/',(req,res)=>{
    
   console.log(req.body.email);
if ((req.body.email===user.email||req.body.email===user.emailTwo)&&req.body.password===user.password){
  
    req.session.randomword = req.body.email;//creating session
    console.log(req.sessionID);
    res.redirect('/profile')

}
else{

    password=false
    res.redirect('/')
}
   
})

app.get('/profile',(req,res)=>{
if(req.session.randomword) {

    // console.log(req.session.randomword);
    // console.log(req.session);
    console.log(req.sessionID);
    // console.log(req.sessionStore);
    
    res.render('profile')
    
}
else{

    res.redirect('/')

}

})

app.get('/profile/logout',(req,res)=>{

    password=true
    req.session.destroy()
    res.redirect('/')

})

app.listen(8000,()=>console.log('Server started'))