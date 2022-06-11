import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const AppType = () =>{
  const [Data, setData] = useState([]);//для гет запиту 
  //для перегляду даних початок
  const [RowData,SetRowData] = useState([])
  const [ViewShow,SetViewData] = useState(false)
  const handleViewShow = () => {SetViewData(true)}
  const handleViewClose = () => {SetViewData(false)}
  //для перегляду даних кінець

  //для редагування даних початок
  const [ViewEdit,SetEditData] = useState(false)
  const handleEditShow = () => {SetEditData(true)}
  const handleEditClose = () => {SetEditData(false)}
  //для редагування даних кінець



  //для Додавання даних початок
  const [ViewPost,SetPostData] = useState(false)
  const handlePostShow = () => {SetPostData(true)}
  const handlePostClose = () => {SetPostData(false)}
  //для Додавання даних кінець


  // тут буде локальна зміна яка буде тримати дані
  const [typeRoom,settypeRoom] = useState("")
  const [price,setprice] = useState("")
  



  // витянем Ід для видалення і для оновлення
  const[id,setId] = useState("");

  const[Delete,setDelete] = useState(false);



  const GetTypeData = () =>{
  const url = 'http://localhost:5128/type' //потім почекати цю силку
  axios.get(url)
  .then(response=>{
      console.log(response);
      const result = response.data;
      const { data} = result;
     
          setData(result)
          console.log(data)
  })
  .catch(err =>{
      console.log(err)
  })

  }

  const handleSubmit = () =>{
      const url = 'http://localhost:5128/type' //потім почекати цю силку
      const Credentials = {typeRoom, price }
      axios.post(url,Credentials)
      .then(response=>{
          console.log(response);
          const result = response.data;
          const {status, message, data} = result;
      
             
              window.location.reload()
      })
  }

  const handleEdit = () =>{
      const url =`http://localhost:5128/type/${id}` //потім почекати цю силку
      const Credentials = {id, typeRoom, price }
      console.log('Edit');
      console.log(Credentials, id);
      axios.put(url,Credentials)
          .then(response=>{
              const result = response.data;
              const {status, message} = result;
              console.log(message, status)
                  window.location.reload()
          })
  }

  //функція для деліту
  const handleDelete = () =>{
      const url =`http://localhost:5128/type/${id}` //потім почекати цю силку
      
      axios.delete(url)
          .then(response=>{
              const result = response.data;
              const {status, message} = result;
              console.log(message, status)
                  window.location.reload()
          })
  }




  useEffect(()=>{
    GetTypeData();
  },[])

  console.log(Data);
    return (
      <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='outline-info' onClick={()=>{handlePostShow()}}>
                        <i className='fa fa-plu'></i>
                            Додати новий тип
                    </Button>
                    
                
            </div>
             <div className='row'>
                <div className='table-responsive'>
                    <table className='table  table-hover table-bordered'>
                        <thead>
                            <tr className='table-primary'>
                                <th>Id</th>
                                <th>TypeRoom</th>
                                <th>Price</th>  
                                <th>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data?.type?.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.typeRoom}</td>
                                    <td>{item.price}</td>
                                    <td style={{minWidth:140}}>
                                    
                                    <Button size='sm' variant='outline-primary' onClick={() =>{handleViewShow(SetRowData(item))}} >Переглянути</Button> {' '}
                                    <Button size='sm' variant='outline-warning' onClick={() =>{handleEditShow(SetRowData(item),setId(item.id))}}>Редагувати </Button> {' '}
                                    <Button size='sm' variant='outline-danger'  onClick={() =>{handleViewShow(SetRowData(item),setId(item.id), setDelete(true))}}>Видалити </Button> {' '}
                                     
                                    </td>                            
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
            </div>
            {/* цей блок для перегляду всіх даних про гж */}
            <div className='model-box-view'>
                <Modal
                show={ViewShow}
                onHide={handleViewClose}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Дані про тип</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.typeRoom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.price} readOnly />
                            </div>
                            {
                                Delete &&(
                                    <Button type='submit' className='btn btn-danger mt-4'onClick={handleDelete}>Видалити тип</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleViewClose}>Закрити</Button>
                    </Modal.Footer>

                </Modal>
            </div>
            {/*цей блок для додавання гж в database */}
            <div className='model-box-view'>
            <Modal
                show={ViewPost}
                onHide={handlePostClose}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Додати тип</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e)=> settypeRoom(e.target.value)} placeholder="Введіть назву типу"  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e)=> setprice(e.target.value)} placeholder="Введіть ціну"  />
                            </div>
                            
                            <Button type='submit' className='btn btn-success mt-4'onClick={()=>{handleSubmit()}}> Додати тип</Button>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handlePostClose}>Закрити</Button>
                    </Modal.Footer>

                </Modal>
            </div>
            {/* цей блок для редагування всіх даних про гж */}
            <div className='model-box-view'>
            <Modal
                show={ViewEdit}
                onHide={handleEditClose}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Редагувати</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Назва типу</label>
                                <input type="text" className='form-control' onChange={(e)=> settypeRoom(e.target.value)} placeholder="Введіть назву типу" defaultValue={RowData.typeRoom}  />
                            </div>
                            <div className='form-group mt-3'>  
                                <label>Ціна</label>
                                <input type="text" className='form-control' onChange={(e)=> setprice(e.target.value)} placeholder="Введіть ціну" defaultValue={RowData.price} />
                            </div>
                           
                            
                            <Button type='submit' className='btn btn-warning mt-4'onClick={()=>{handleEdit()}}> Редагувати</Button>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleEditClose}>Закрити</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        </div>

  );
}

export default AppType;