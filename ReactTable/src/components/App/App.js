import React, {useEffect, useState} from 'react';
import './App.css';
import Table from '../Table/table';
import axios from 'axios';
import Pagination from '../Pagination/Pagination'
import ProfileInfo from '../ProfileInfo/ProfileInfo';




function App() {

  const [data, setData] = useState([])
  const [usersPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentUsers, setCurrentUsers] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickProfileInfo, setClickProfileInfo] = useState(true)
  const [profileInfo, setProfileInfo] = useState([])
  
  
  const paginate = pageNumber => setCurrentPage(pageNumber)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
    
  useEffect(()  => {
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try{
          const result =  await axios('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
          setData(result.data)
         
        } catch(error){
          setIsError(true)
        }
        
        setIsLoading(false)
        
    }
  
    fetchData()
  },[])
  
  

  useEffect(() => {
    setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
  }, [currentPage, indexOfFirstUser, indexOfLastUser])

  useEffect(() => {
    if(!isLoading){
      setCurrentUsers(data.slice(indexOfFirstUser,indexOfLastUser))
    }
  },[indexOfFirstUser, indexOfLastUser, isLoading])
   
  const viewProfileInfo = (profile) => {
      setClickProfileInfo(false)
      console.log(profile);
      console.log(currentUsers);
      currentUsers.forEach((e,index) => {
        if(index === profile){
            setProfileInfo(e)
        }
      })
  }




  return (
    <div>
      {isError && <h2>Something went wrong... </h2>}
      {isLoading  ? (<div>Please stand by...</div>) : (
        
        <React.Fragment>
        <Table 
        data = {currentUsers}
        viewProfileInfo = {viewProfileInfo}
        />
        
        <Pagination 
        totalUsers={data.length}
        usersPerPage = {usersPerPage}
        currentPage = {currentPage}
        paginate = {paginate}
        />
      </React.Fragment>
      )}
      {clickProfileInfo ? <h2>Click on user profile</h2> : <ProfileInfo profileData ={profileInfo}/>}
       
        
    </div>
    
    
  )

  
   
}

export default App;
