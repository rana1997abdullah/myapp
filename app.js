const express = require('express')
const app = express()
const port = 3000


var todos =[
    {
title:"add Header Componenet",
id:1,
status:'in progress'
},{
    title:'Add Footer',
    id:2,
    status:'to do'
}

]
function getRandomNumber(n){
    return Math.floor(Math.floor()*n);
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
app.get('/', (req, res) => {
  res.status(200).send(todos);

})
app.get('/img',(req,res)=>{
    res.status(200).send('./img.jpg');
})
app.use('/static', express.static('public'))


app.get('/delete', (req, res) => {
   
    if(todos.length){
       let deletedEl = todos.splice(getRandomNumber(todos.length),1)
    res.status(204).send('the element is deleted: '+deletedEl);
      
    }else
    res.status(422).send('no objects are available for deletion.')

  })
 


