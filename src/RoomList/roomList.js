import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {NavLink, Route, Routes } from 'react-router-dom';
import { FloatingLabel, Form } from "react-bootstrap";

const AppRoomList = () =>{
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
  const [numRoom,setnumRoom] = useState("")
  const [roomCount,setroomCount] = useState("")
  const [personCount,setpersonCount] = useState("")
  const [freeBedCount,setfreeBedCount] = useState("")
  const [roomArea,setroomArea] = useState("")
  const [roomSex,setroomSex] = useState("")
  const [dormitoryId,setdormitoryId] = useState("")
  const [typeId,settypeId] = useState("")



  // витянем Ід для видалення і для оновлення
  const[id,setId] = useState("");

  const[Delete,setDelete] = useState(false);



  const GetRoomListData = () =>{
  const url = 'http://localhost:5128/room' //потім почекати цю силку
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
      const url = 'http://localhost:5128/room' //потім почекати цю силку
      const Credentials = {numRoom, roomCount, personCount, freeBedCount, roomArea, roomSex, dormitoryId, typeId   }
      axios.post(url,Credentials)
      .then(response=>{
          console.log(response);
          const result = response.data;
          const {status, message, data} = result;
      
             
              window.location.reload()
      })
  }

  const handleEdit = () =>{
      const url =`http://localhost:5128/room/${id}` //потім почекати цю силку
      const Credentials = {numRoom, roomCount, personCount, freeBedCount, roomArea, roomSex, dormitoryId, typeId  }
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
      const url =`http://localhost:5128/room/${id}` //потім почекати цю силку
      
      axios.delete(url)
          .then(response=>{
              const result = response.data;
              const {status, message} = result;
              console.log(message, status)
                  window.location.reload()
          })
  }




  useEffect(()=>{
      GetRoomListData();
  },[])

  console.log(Data);
    return (
      <div>
      <div className='row'>
          <div className='mt-5 mb-4'>
              <Button variant='outline-info' onClick={()=>{handlePostShow()}}>
                  <i className='fa fa-plu'></i>
                      Додати нову кімнату
              </Button>
              
          
      </div>
       <div className='row'>
          <div className='table-responsive'>
              <table className='table  table-hover table-bordered'>
                  <thead>
                      <tr className='table-primary'>
                          <th>Id</th>
                          <th>numRoom</th>
                          <th>roomCount</th>
                          <th>personCount</th>
                          <th>freeBedCount</th>
                          <th>roomArea</th>
                          <th>roomSex</th>
                          <th>dormitoryId</th>
                          <th>typeId</th>
                          <th>Buttons</th>
                      </tr>
                  </thead>
                  <tbody>
                      {Data?.rooms?.map((item) =>
                          <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.numRoom}</td>
                              <td>{item.roomCount}</td>
                              <td>{item.personCount}</td>
                              <td>{item.freeBedCount}</td>
                              <td>{item.roomArea}</td>
                              <td>{item.roomSex}</td>
                              <td>{item.dormitoryId}</td>
                              <td>{item.typeId}</td>
                              <td style={{minWidth:140}}>
                              <NavLink to="roomInfo"
                              style={{textDecoration:"none"}}>
                                  <Button size='sm' variant='outline-primary'>
                                      Поселити студента
                                  </Button>{' '}
                                  </NavLink> 
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
                  <Modal.Title>Дані про кімнату</Modal.Title>

              </Modal.Header>
              <Modal.Body>
                  <div>
                  
                      <div className='form-group'>
                          <input type="text" className='form-control' value={RowData.numRoom} readOnly />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' value={RowData.roomCount} readOnly />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' value={RowData.personCount} readOnly />
                      </div>
                      <div className='form-group'>
                          <input type="text" className='form-control' value={RowData.freeBedCount} readOnly />
                      </div>
                      <div className='form-group'>
                          <input type="text" className='form-control' value={RowData.roomArea} readOnly />
                      </div>
                      <div className='form-group'>
                          <input type="text" className='form-control' value={RowData.roomSex} readOnly />
                      </div>
                      <div className='form-group'>
                          <input type="text" className='form-control' value={RowData.dormitoryId} readOnly />
                      </div>
                      <div className='form-group'>
                          <input type="text" className='form-control' value={RowData.typeId} readOnly />
                      </div>
                      {
                          Delete &&(
                              <Button type='submit' className='btn btn-danger mt-4'onClick={handleDelete}>Видалити кімнтау</Button>
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
                  <Modal.Title>Додати кімнату</Modal.Title>

              </Modal.Header>
              <Modal.Body>
                  <div>
                      <div className='form-group'>
                          <input type="text" className='form-control' onChange={(e)=> setnumRoom(e.target.value)} placeholder="Введіть номер кімати"  />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' onChange={(e)=> setroomCount(e.target.value)} placeholder="Введіть кількість місць у кімнаті"  />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' onChange={(e)=> setpersonCount(e.target.value)} placeholder="Введіть кількість проживаючих"   />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' onChange={(e)=> setfreeBedCount(e.target.value)} placeholder="Введіть вільних місць"  />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' onChange={(e)=> setroomArea(e.target.value)} placeholder="Введіть площу кімнати "  />
                      </div>
                      <div className='form-group mt-3'>
                      <FloatingLabel controlId="floatingSelect" onChange={(e)=> setroomSex(e.target.value)} label="Оберіть стать">
                            <Form.Select aria-label="Floating label select example">
                                <option></option>
                                <option value="Чоловіча">Чоловіча</option>
                                <option value="Жіноча">Жіноча</option>
                            </Form.Select>
                            </FloatingLabel>
                         </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' onChange={(e)=> setdormitoryId(e.target.value)} placeholder="Введіть айді гуртожитку "  />
                      </div>
                      <div className='form-group mt-3'>
                          <input type="text" className='form-control' onChange={(e)=> settypeId(e.target.value)} placeholder="Введіть айді типу кімнати"  />
                      </div>
                      <Button type='submit' className='btn btn-success mt-4'onClick={()=>{handleSubmit()}}>Додати кімнату</Button>

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
                          <label>Номер кімнати</label>
                          <input type="text" className='form-control' onChange={(e)=> setnumRoom(e.target.value)} placeholder="Введіть номер кімати" defaultValue={RowData.buldingName}  />
                      </div>
                      <div className='form-group mt-3'>  
                          <label>Кількість місць</label>
                          <input type="text" className='form-control' onChange={(e)=> setroomCount(e.target.value)} placeholder="Введіть кількість місць у кімнаті" defaultValue={RowData.address} />
                      </div>
                      <div className='form-group mt-3'>
                          <label>Кількість проживаючих</label>
                          <input type="text" className='form-control' onChange={(e)=> setpersonCount(e.target.value)} placeholder="Введіть кількість проживаючих"  defaultValue={RowData.postIndex} />
                      </div>
                      <div className='form-group'>
                          <label>Кількість вільних місць</label>
                          <input type="text" className='form-control' onChange={(e)=> setfreeBedCount(e.target.value)} placeholder="Введіть вільних місць" defaultValue={RowData.roomCount} />
                      </div>
                      <div className='form-group'>
                          <label>Площа</label>
                          <input type="text" className='form-control' onChange={(e)=> setroomArea(e.target.value)} placeholder="Введіть площу " defaultValue={RowData.personCount} />
                      </div>
                      <div className='form-group'>
                          <label>Стать</label>
                          <input type="text" className='form-control' onChange={(e)=> setroomSex(e.target.value)} placeholder="Стать" defaultValue={RowData.freeBedCount} />
                      </div>
                      <div className='form-group'>
                          <label>Ід гуртожитку</label>
                          <input type="text" className='form-control' onChange={(e)=> setdormitoryId(e.target.value)} placeholder="Введіть айді гуртожитку" defaultValue={RowData.personCount} />
                      </div>
                      <div className='form-group'>
                          <label>Ід типу кімнати</label>
                          <input type="text" className='form-control' onChange={(e)=> settypeId(e.target.value)} placeholder="Введіть айді типу" defaultValue={RowData.freeBedCount} />
                      </div>
                      
                      <Button type='submit' className='btn btn-warning mt-4'onClick={()=>{handleEdit()}}>Редагувати</Button>

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

export default AppRoomList;