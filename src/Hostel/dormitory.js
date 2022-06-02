
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";


const AppDormitory = () =>{
    const [Data, setData] = useState([]);
    const GetDormitoryData = () =>{
    const url = 'http://localhost:5128/dormitory' //потім почекати цю силку
    axios.get(url)
    .then(response=>{
        const result = response.data;
        const {status, message, data} = result;
        if(status !== 'SUCCESS'){
            alert(message, status)
        }
        else{
            setData(data)
            console.log(data)
        }
       
  
    })
    .catch(err =>{
        console.log(err)
    })

    }

    useEffect(()=>{
        GetDormitoryData();
    },[])


    return(
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary'>
                        <i className='fa fa-plu'>
                            Додати новий гуртожиток
                        </i>
                    </Button>
                    
                
            </div>
             <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>BuldingName</th>
                                <th>Address</th>
                                <th>PostIndex</th>
                                <th>RoomCount</th>
                                <th>PersonCount</th>
                                <th>FreeBetCount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.BuldingName}</td>
                                    <td>{item.Address}</td>
                                    <td>{item.PostIndex}</td>
                                    <td>{item.RoomCount}</td>
                                    <td>{item.PersonCount}</td>
                                    <td>{item.FreeBetCount}</td>
                                    <td style={{minWidth:190}}></td>
                                    <Button size='sm' variant='primary'>Додати кімнату</Button>
                                    <Button size='sm' variant='warning'>Редагувати</Button>
                                    <Button size='sm' variant='danger'>Видалити</Button>
                                    



                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
            </div>
        </div>
    );
}

export default AppDormitory;