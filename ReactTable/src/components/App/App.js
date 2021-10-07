import React, {useEffect, useState} from 'react'
import './App.css'
import Table from '../Table/table'
import axios from 'axios'
import Pagination from '../Pagination/Pagination'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import Filter from '../Filter/Filter'
import Search from '../Search/Search'



function App() {

  const [data, setData] = useState([])
  const [usersPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentUsers, setCurrentUsers] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clickProfileInfo, setClickProfileInfo] = useState(true)
  const [profileInfo, setProfileInfo] = useState([])
  const [filterCheck, setFilterCheck] = useState(false)
  const [filterData, setDataFilter] = useState([])
  const [filteredData, setFilteredData] = useState([])
  
  
  
  
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
      if(filterCheck){
        filterData.forEach((e,index) => {
          if(index === profile){
              setProfileInfo(e)
          }
        })
      }else{
        currentUsers.forEach((e,index) => {
          if(index === profile){
              setProfileInfo(e)
          }
        })
      }
     
  }

  const FilterState = (e) => {
    
    setFilterCheck(true)
    if(e.target.value === '') setFilterCheck(false)
    setDataFilter(data.filter((el) => el.adress.state === e.target.value))
    
}

const SortId = (val) => {
    if(filterCheck) {
      if(val) {
          setDataFilter(filterData.sort((a,b) => a.id - b.id))
          console.log(filterData);
      } else {
          setDataFilter(filterData.sort((a,b) => b.id - a.id))
      }
  } else {
      if(val) {
          setData(data.sort((a,b) => a.id - b.id))
          setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
      } else {
         setData(data.sort((a,b) => b.id - a.id))
         setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
      }
      
  }
}

const sortData = (val, el) => {
  if(val) {
    setData(data.sort((a,b) => a[el].localeCompare(b[el])))
    setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
  } else {
     setData(data.sort((a,b) => b[el].localeCompare(a[el])))
     setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
  }
  
}

const sortDataFilter = (val ,el) => {
  if(val) {
      setDataFilter(filterData.sort((a,b) => a[el].localeCompare(b[el])))
  } else {
      setDataFilter(filterData.sort((a,b) => b[el].localeCompare(a[el])))
  }
}

const sortString = (val, str) => {
  switch (str) {
      case 'firstName':
          sortData(val, str)
          if(filterCheck) sortDataFilter(val,str)
          break
      case 'lastName':
          sortData(val, str)
          if(filterCheck) sortDataFilter(val,str)
          break
      case 'email':
          sortData(val, str);
          if(filterCheck) sortDataFilter(val,str)
          break
      case 'phone':
          sortData(val, str);
          if(filterCheck) sortDataFilter(val,str)
          break
      case 'state':
          if(val) {
              setData(data.sort((a,b) => a.adress.state.localeCompare(b.adress.state)))
              setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
          } else {
              setData(data.sort((a,b) => b.adress.state.localeCompare(a.adress.state)))
              setCurrentUsers(data.slice(indexOfFirstUser, indexOfLastUser))
          }
          break
      default:
          break
  }
}

  const search = (e) => {
    const filtered = data && data.filter((item) => {
      return item.firstName.toLowerCase().trim().startsWith(e.target.value.toLowerCase().trim())
    })
   
    e.target.value ? setFilterCheck(true) : setFilterCheck (false)

    setDataFilter(filtered)
    setCurrentUsers(filtered.slice(indexOfFirstUser, indexOfLastUser))
    
}



  return (
    <div className = 'table'>
      <div className='search_and_filter'> 
        <Search search = {search}/>
        <Filter FilterState={FilterState}/>
      </div>
      {isError && <h2>Something went wrong... </h2>}
      {isLoading  ? (<div>Please stand by...</div>) : (
       <React.Fragment>  
       <Table 
       data = {filterCheck ? filterData : currentUsers}
       SearchData = {data}
       sortId = {SortId}
       viewProfileInfo = {viewProfileInfo}
       sortString = {sortString}
       />
       <Pagination 
       totalUsers={filterCheck ? filterData.length : (filteredData.length > 0 ? filteredData.length : data.length)}
       usersPerPage = {usersPerPage}
       currentPage = {currentPage}
       paginate = {paginate}
       />
     </React.Fragment>
        
      )}
      {clickProfileInfo ? <h2 className = 'click_on_user'>Click on user profile</h2> : <ProfileInfo profileData ={profileInfo}/>}
       
        
    </div>
  )
}
    

    
    
  

  
   


export default App;
