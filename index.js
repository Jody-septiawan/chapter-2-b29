const express = require('express')

const app = express()
const PORT = 5000

let isLogin = true // boolean => true/false

const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

let blogs = [ 
    {
        title: 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
        content: 'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, molestiae numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta, eligendi debitis?',
        author: 'Ichsan Emrald Alamsyah',
        post_at: '12 Jul 2021 22:30 WIB'
    }
 ]

app.set('view engine','hbs') // set tample engine

app.use('/public', express.static(__dirname+'/public')) // set public folder/path
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/blog', function(req,res){ // Route for blog data

    console.log(blogs)
    
    let dataBlogs = blogs.map(function(data){
        return {
            ...data,
            isLogin: isLogin
        }
    })

    res.render('blog', {isLogin: isLogin, blogs: dataBlogs})
})

app.get('/add-blog', function(req,res){ // Route for add-blog
    res.render('add-blog')
})

app.post('/blog', function(req,res){ // Route for post blog
    let data = req.body

    data = {
        title: data.title,
        content: data.content,
        author: 'Jody Septiawan',
        post_at: getFullTime(new Date())
    }

    blogs.push(data)
    
    res.redirect('/blog')
})

app.get('/delete-blog/:index', function(req,res){
    let index = req.params.index
    blogs.splice(index, 1)
    res.redirect('/blog')
})

app.get('/contact-me', function(req,res){ // Route for contact me
    res.render('contact')
})

app.get('/detail-blog/:id', function(req,res){

    let id = req.params.id

    res.render('blog-detail', {id: id})
})

app.listen(PORT, function(){
    console.log(`Server starting on PORT: ${PORT}`)
})

function getFullTime(time) {
    const date = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
  
    return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}