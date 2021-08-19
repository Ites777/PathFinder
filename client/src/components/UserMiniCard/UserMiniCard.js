import { Avatar } from '@material-ui/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'


export default function UserMiniCard({userId}) {

  const id = userId
  const [user, setUser] = useState({}) 
  useEffect(()=>{
    axios(`/auth/user/${id}`)
    .then(res => 
      setUser({
        firstName : res.data.firstName,
        lastName : res.data.lastName
      })
    )
  },[])

  return( 


    <div>

<Card style={{
    display:'flex',
    justifyContent: 'Center',
    border: 'none',
}}>
  <Card.Body style={{
    padding: '5px',
    display:'flex',
    }}>
  <Avatar>{user.firstName}</Avatar>
  <div style={{marginLeft: '20px'}}>
    <Card.Title style={{fontSize: '15px',}}>{user.firstName}</Card.Title>
    <Card.Subtitle style={{fontSize: '10px',}} className="mb-2 text-muted">{user.lastName}</Card.Subtitle>
  </div>
  
  </Card.Body>
</Card>
        

    </div>
  )
}
