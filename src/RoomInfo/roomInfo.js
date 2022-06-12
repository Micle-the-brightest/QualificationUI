
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

import {Col } from "react-bootstrap";


const AppRoomInfo = () =>{
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
  const [studName,setstudName] = useState("")
  const [numRoom,setnumRoom] = useState("")
  const [typeRoom,settypeRoom] = useState("")
  const [faculty,setfaculty] = useState("")
  const [courseNum,setcourseNum] = useState("")
  const [roomSex,setroomSex] = useState("")
  const [dateOfSettlement,setdateOfSettlement] = useState("")
  const [dateOfDeparture,setdateOfDeparture] = useState("")
  const [earlyDepartureDate,setearlyDepartureDate] = useState("")
  const [roomId,setroomId] = useState("")



  // витянем Ід для видалення і для оновлення
  const[id,setId] = useState("");

  const[Delete,setDelete] = useState(false);



  const GetRoomInfoData = () =>{
  const url = 'http://localhost:5128/roomInfo' //потім почекати цю силку
  axios.get(url)
  .then(response=>{
      console.log(response);
      const result = response.data;
      const {data} = result;
     
          setData(result)
          console.log(data)
  })
  .catch(err =>{
      console.log(err)
  })

  }

  const handleSubmit = () =>{
      const url = 'http://localhost:5128/roomInfo' //потім почекати цю силку
      const Credentials = {studName, numRoom, typeRoom, faculty, courseNum, roomSex, dateOfSettlement, dateOfDeparture, earlyDepartureDate, roomId }
      axios.post(url,Credentials)
      .then(response=>{
          console.log(response);
          const result = response.data;
          const {status, message, data} = result;
      
             
              window.location.reload()
      })
  }

  const handleEdit = () =>{
      const url =`http://localhost:5128/roomInfo/${id}` //потім почекати цю силку
      const Credentials = {id, studName, numRoom, typeRoom, faculty, courseNum, roomSex, dateOfSettlement, dateOfDeparture, earlyDepartureDate, roomId }
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
      const url =`http://localhost:5128/roomInfo/${id}` //потім почекати цю силку
      
      axios.delete(url)
          .then(response=>{
              const result = response.data;
              const {status, message} = result;
              console.log(message, status)
                  window.location.reload()
          })
  }




  useEffect(()=>{
    GetRoomInfoData();
  },[])


  const [validated, setValidated] = useState(false);

  const handleSubmit1 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  console.log(Data);
    return (
      <div>
            <div>
                <div className='mt-5 mb-4'>
                    <Button variant='outline-info' onClick={()=>{handlePostShow()}}>
                        <i className='fa fa-plu'></i>
                            Заселити студента
                    </Button>
                    
                
            </div>
             <div className='row'>
                <div className='table-responsive'>
                    <table className='table  table-hover table-bordered'>
                        <thead>
                            <tr  className='table-primary'>
                                <th>Id</th>
                                <th>№ of room</th>
                                <th>roomId</th>
                                <th>Name</th>                             
                                {/* <th>Type</th> */}
                                <th>Faculty</th>
                                <th>Course</th>
                                <th>Room Sex</th>
                                {/* <th>dateOfSettlement</th>
                                <th>dateOfDeparture</th>
                                <th>earlyDepartureDate</th> */}
                                
                                <th>Buttons</th>

                                
                            </tr>
                        </thead>
                        <tbody>
                        
                            {Data?.roomsInfo?.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.numRoom}</td>
                                    <td>{item.roomId}</td>
                                    <td>{item.studName}</td>
                                    {/* <td>{item.typeRoom}</td> */}
                                    <td>{item.faculty}</td>
                                    <td>{item.courseNum}</td>
                                    <td>{item.roomSex}</td>
                                    {/* <td>{item.dateOfSettlement}</td>
                                    <td>{item.dateOfDeparture}</td>
                                    <td>{item.earlyDepartureDate}</td> */}
                                    
                                    <td style={{minWidth:140}}>
                                    <Button size='sm' variant='outline-primary' onClick={() =>{handleViewShow(SetRowData(item))}}>Додатково</Button> {' '}
                                    <Button size='sm' variant='outline-warning' onClick={() =>{handleEditShow(SetRowData(item),setId(item.id))}}>Редагувати </Button> {' '}
                                    <Button size='sm' variant='outline-danger'  onClick={() =>{handleViewShow(SetRowData(item),setId(item.id), setDelete(true))}}>Видалити </Button> 
                                     
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
                                <input type="text" className='form-control' value={RowData.studName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.numRoom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.typeRoom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.faculty} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.courseNum} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.roomSex} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dateOfSettlement} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dateOfDeparture} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.earlyDepartureDate} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.roomId} readOnly />
                            </div>
                            {
                                Delete &&(
                                    <Button type='submit' className='btn btn-danger mt-4'onClick={handleDelete}>Видалити гуртожиток</Button>
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
                        <Modal.Title>Заселити студента</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit1}>
                                <Form.Group as={Col}  controlId="validationCustom01">
                                    <Form.Control
                                        required
                                        type="text"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setstudName(e.target.value)}
                                        placeholder="Введіть ім'я студента"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control  mt-3'
                                    onChange={(e)=> setnumRoom(e.target.value)}
                                    placeholder="Введіть номер кімнати"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  controlId="validationCustom01">
                                    <Form.Control
                                        required
                                        type="text"
                                        className='form-control  mt-3'
                                        onChange={(e)=> settypeRoom(e.target.value)}
                                        placeholder="Введіть тип кімнати"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="text"
                                    className='form-control  mt-3'
                                    onChange={(e)=> setfaculty(e.target.value)}
                                    placeholder="Введіть факультет студента"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  controlId="validationCustom01">
                                    <Form.Control
                                        required
                                        type="number"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setcourseNum(e.target.value)}
                                        placeholder="Введіть курс студента"
                                    />
                                </Form.Group>

                                <FloatingLabel as={Col}  mt-3 controlId="validationCustom02"
                                    className=' mt-3'
                                    required
                                    type="text"
                                    onChange={(e)=> setroomSex(e.target.value)}
                                    label="Оберіть стать"
                                    >
                                    <Form.Select aria-label="Floating label select example">
                                        <option></option>
                                        <option value="Чоловіча">Чоловіча</option>
                                        <option value="Жіноча">Жіноча</option>
                                    </Form.Select>
                                </FloatingLabel>                          

                                <Form.Group as={Col}  controlId="validationCustom01">
                                    <Form.Control
                                        required
                                        type="date"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setdateOfSettlement(e.target.value + "T11:17:37.124Z")}
                                        placeholder="Введіть дату заселення"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="date"
                                    className='form-control  mt-3'
                                    onChange={(e)=> setdateOfDeparture(e.target.value + "T11:17:37.124Z")}
                                    placeholder="Введіть дату виселення"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="date"
                                    className='form-control  mt-3'
                                    onChange={(e)=> setearlyDepartureDate(e.target.value + "T11:17:37.124Z")}
                                    placeholder="Дострокова дата виселення"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control  mt-3'
                                    onChange={(e)=> setroomId(e.target.value)}
                                    placeholder="Введіть Ід кімнати"
                                />
                                </Form.Group>

                                <Button type="submit" className='btn btn-success mt-4'onClick={()=>{handleSubmit()}}> Заселити студента</Button>
                            </Form>
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
                            <Form noValidate validated={validated} onSubmit={handleSubmit1}>
                                <Form.Group as={Col}  controlId="validationCustom01">
                                <Form.Label>Ім'я студента</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className='form-control  '
                                        onChange={(e)=> setstudName(e.target.value)}
                                        defaultValue={RowData.studName}
                                        placeholder="Введіть ім'я студента"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Номер кімнати</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control '
                                    onChange={(e)=> setnumRoom(e.target.value)}
                                    defaultValue={RowData.numRoom}
                                    placeholder="Введіть номер кімнати"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  controlId="validationCustom01">
                                <Form.Label>Тип кімнати</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className='form-control  '
                                        onChange={(e)=> settypeRoom(e.target.value)}
                                        defaultValue={RowData.typeRoom}
                                        placeholder="Введіть тип кімнати"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Факультет студента</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    className='form-control  '
                                    onChange={(e)=> setfaculty(e.target.value)}
                                    defaultValue={RowData.faculty}
                                    placeholder="Введіть факультет студента"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  controlId="validationCustom01">
                                <Form.Label>Курс студента</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        className='form-control  '
                                        onChange={(e)=> setcourseNum(e.target.value)}
                                        defaultValue={RowData.courseNum}
                                        placeholder="Введіть курс студента"
                                    />
                                </Form.Group>

                                <Form.Label>Оберіть стать</Form.Label>
                                <FloatingLabel as={Col}  mt-3 controlId="validationCustom02"
                                    
                                    required
                                    type="text"
                                    onChange={(e)=> setroomSex(e.target.value)}
                                    defaultValue={RowData.roomSex}
                                    label="Оберіть стать"
                                    >
                                    <Form.Select aria-label="Floating label select example">
                                        <option></option>
                                        <option value="Чоловіча">Чоловіча</option>
                                        <option value="Жіноча">Жіноча</option>
                                    </Form.Select>
                                </FloatingLabel>                          

                                <Form.Group as={Col}  controlId="validationCustom01">
                                <Form.Label>Дата заселення</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        className='form-control '
                                        onChange={(e)=> setdateOfSettlement(e.target.value + "T11:17:37.124Z")}
                                        defaultValue={RowData.dateOfSettlement}
                                        placeholder="Введіть дату заселення"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Дата виселення</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    className='form-control  '
                                    onChange={(e)=> setdateOfDeparture(e.target.value + "T11:17:37.124Z")}
                                    defaultValue={RowData.dateOfDepartur}
                                    placeholder="Введіть дату виселення"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Дострокова дата виселення</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    className='form-control  '
                                    onChange={(e)=> setearlyDepartureDate(e.target.value + "T11:17:37.124Z")}
                                    defaultValue={RowData.earlyDepartureDate}
                                    placeholder="Дострокова дата виселення"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Ід кімнати</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control'
                                    onChange={(e)=> setroomId(e.target.value)}
                                    defaultValue={RowData.roomId}
                                    placeholder="Введіть Ід кімнати"
                                />
                                </Form.Group>

                                <Button type="submit" className='btn btn-warning mt-4'onClick={()=>{handleEdit()}}> Редагувати</Button>
                            </Form>
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

export default AppRoomInfo;