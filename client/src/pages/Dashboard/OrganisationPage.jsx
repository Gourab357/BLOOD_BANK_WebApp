import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';
const OrganisationPage = () => {
  const {user}=useSelector(state=>state.auth) 
  const[data,setData]=useState([])
   
  const getOrg=async()=>{
    try{
      if(user?.role==='donar'){
        const {data}=await API.get('/inventory/get-organisation')
      if(data?.success){
        setData(data?.organisations)
      }
      }
      if(user?.role==='hospital'){
        const {data}=await API.get('/inventory/get-organisation-for-hospital')
      if(data?.success){
        setData(data?.organisations)
      }
      }
      
    }
    catch(error){
      console.log(error)
    }
  };
  useEffect(()=>{
    getOrg();
  },[user]);
  return (
    <Layout>
      <h1>ORG Page</h1>

      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            
          </tr>
        </thead>
        <tbody>
          {data?.map(record=>(
          <tr key={record._id}>
            <td>{record.organisationName||"Guest"}</td>
            <td>{record.email}</td>
            <td>{record.phone}</td>
            <td>{record.address}</td>
            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
          </tr>
          ))}
         
        </tbody>
      </table>
    </Layout>
  )
};

export default OrganisationPage;
