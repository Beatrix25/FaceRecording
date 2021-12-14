import Axios from 'axios';

export const colourOptions = await getSubjects();
  const getSubjects=()=>{
    Axios.get('http://localhost:3001/subjects',{
      username:username,
      password:password
    }).then((response)=>{
      
    console.log(response.data, "getData");
    });
  }
  

