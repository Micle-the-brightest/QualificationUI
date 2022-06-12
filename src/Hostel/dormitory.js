import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import {Form, Col } from "react-bootstrap";


const AppDormitory = () =>{
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
    const [buldingName,setbuldingName] = useState("")
    const [address,setaddress] = useState("")
    const [postIndex,setpostIndex] = useState("")
    const [roomCount,setroomCount] = useState("")
    const [personCount,setpersonCount] = useState("")
    const [freeBedCount,setfreeBedCount] = useState("")



    // витянем Ід для видалення і для оновлення
    const[id,setId] = useState("");

    const[Delete,setDelete] = useState(false);



    const GetDormitoryData = () =>{
    const url = 'http://localhost:5128/dormitory' //потім почекати цю силку
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
        const url = 'http://localhost:5128/dormitory' //потім почекати цю силку
        const Credentials = {buldingName, address, postIndex, roomCount, personCount, freeBedCount }
        axios.post(url,Credentials)
        .then(response=>{
            console.log(response);
            const result = response.data;
            const {status, message, data} = result;
        
               
                window.location.reload()
        })
    }

    const handleEdit = () =>{
        const url =`http://localhost:5128/dormitory/${id}` //потім почекати цю силку
        const Credentials = {id, buldingName, address, postIndex, roomCount, personCount, freeBedCount }
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
        const url =`http://localhost:5128/dormitory/${id}` //потім почекати цю силку
        
        axios.delete(url)
            .then(response=>{
                const result = response.data;
                const {status, message} = result;
                console.log(message, status)
                    window.location.reload()
            })
    }




    useEffect(()=>{
        GetDormitoryData();
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
    return(
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='outline-info' onClick={()=>{handlePostShow()}}>
                        <i className='fa fa-plu'></i>
                            Додати новий гуртожиток
                    </Button>
                    
                
            </div>
             <div className='row'>
                <div className='table-responsive'>
                    <table className='table  table-hover table-bordered'>
                        <thead>
                            <tr className='table-primary'>
                                <th>Id</th>
                                <th>BuldingName</th>
                                <th>Address</th>
                                <th>PostIndex</th>
                                <th>RoomCount</th>
                                <th>PersonCount</th>
                                <th>FreeBedCount</th>
                                <th>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data?.dormitories?.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.buldingName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.postIndex}</td>
                                    <td>{item.roomCount}</td>
                                    <td>{item.personCount}</td>
                                    <td>{item.freeBedCount}</td>
                                    <td style={{minWidth:140}}>

                                    
                                    <NavLink to="roomList"
                                    style={{textDecoration:"none"}}>
                                        <Button size='sm' variant='outline-primary'>
                                            Додати кімнату 
                                        </Button> {' '}
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
                        <Modal.Title>Дані про гуртожиток</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.buldingName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.address} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.postIndex} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.roomCount} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.personCount} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.freeBedCount} readOnly />
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
                        <Modal.Title>Додати гуртожиток</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit1}>
                                
                                    <Form.Group as={Col}  controlId="validationCustom01">
                                        <Form.Control
                                            required
                                            type="text"
                                            className='form-control  mt-3'
                                            onChange={(e)=> setbuldingName(e.target.value)}
                                            placeholder="Введіть назву гуртожитку"
                                        />
                                        
                                    </Form.Group>
                                    
                                   
                                    <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                    <Form.Control
                                        required
                                        type="text"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setaddress(e.target.value)}
                                        placeholder="Введіть адресу"
                                    />
                                    
                                    </Form.Group>

                                    <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                    <Form.Control
                                        required
                                        type="number"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setpostIndex(e.target.value)}
                                        placeholder="Введіть поштовий індекс"
                                    />
                                    
                                    </Form.Group>

                                    <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                    <Form.Control
                                        required
                                        type="number"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setroomCount(e.target.value)}
                                        placeholder="Введіть кількість кімнат"
                                    />
                                    
                                    </Form.Group>

                                    <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                    <Form.Control
                                        required
                                        type="number"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setpersonCount(e.target.value)}
                                        placeholder="Введіть кількість проживаючих "
                                    />
                                    
                                    </Form.Group>
                                    
                                    <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                    <Form.Control
                                        required
                                        type="number"
                                        className='form-control  mt-3'
                                        onChange={(e)=> setfreeBedCount(e.target.value)}
                                        placeholder="Введіть кількість вільних місць "
                                    />
                                    
                                    </Form.Group>

                                <Button type="submit" className='btn btn-success mt-4' onClick={()=>{handleSubmit()}} >Додати гуртожиток</Button>
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
                                <Form.Group as={Col}  mt-3 controlId="validationCustom01">
                                    <Form.Label>Назва гуртожитка</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className='form-control  '
                                        onChange={(e)=> setbuldingName(e.target.value)}
                                        defaultValue={RowData.buldingName}
                                        placeholder="Введіть назву гуртожитку"
                                    />
                                </Form.Group>
                                
                               
                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Адреса</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    className='form-control  '
                                    onChange={(e)=> setaddress(e.target.value)}
                                    defaultValue={RowData.address}
                                    placeholder="Введіть адресу"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  mt-3 controlId="validationCustom02">
                                <Form.Label>Поштовий індекс</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control '
                                    onChange={(e)=> setpostIndex(e.target.value)}
                                    defaultValue={RowData.postIndex}
                                    placeholder="Введіть поштовий індекс"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  mt-3  controlId="validationCustom02">
                                <Form.Label>Кількість кімнат</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control '
                                    onChange={(e)=> setroomCount(e.target.value)}
                                    defaultValue={RowData.roomCount}
                                    placeholder="Введіть кількість кімнат"
                                />
                                </Form.Group>

                                <Form.Group as={Col}  controlId="validationCustom02">
                                <Form.Label>Кількість проживаючих</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control '
                                    onChange={(e)=> setpersonCount(e.target.value)}
                                    defaultValue={RowData.personCount}
                                    placeholder="Введіть кількість проживаючих "
                                />
                                </Form.Group>
                                
                                <Form.Group as={Col}   controlId="validationCustom02">
                                <Form.Label>Кількість вільних місць</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className='form-control '
                                    onChange={(e)=> setfreeBedCount(e.target.value)}
                                    defaultValue={RowData.freeBedCount}
                                    placeholder="Введіть кількість вільних місць "
                                />
                                </Form.Group>

                            <Button type="submit" className='btn btn-warning mt-4' onClick={()=>{handleEdit()}} >Редагувати</Button>
                        </Form>

                            {/* <div className='form-group'>
                                <label>Назва гуртожитку</label>
                                <input type="text" className='form-control' onChange={(e)=> setbuldingName(e.target.value)} placeholder="Введіть назву гуртожитку" defaultValue={RowData.buldingName}  />
                            </div>
                            <div className='form-group mt-3'>  
                                <label>Адреса</label>
                                <input type="text" className='form-control' onChange={(e)=> setaddress(e.target.value)} placeholder="Введіть адресу" defaultValue={RowData.address} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Поштовий індекс</label>
                                <input type="number" className='form-control' onChange={(e)=> setpostIndex(e.target.value)} placeholder="Введіть поштовий індекс"  defaultValue={RowData.postIndex} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Кількість кімнат</label>
                                <input type="number" className='form-control' onChange={(e)=> setroomCount(e.target.value)} placeholder="Введіть кількість кімнат" defaultValue={RowData.roomCount} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Кількість заселених</label>
                                <input type="number" className='form-control' onChange={(e)=> setpersonCount(e.target.value)} placeholder="Введіть проживаючих " defaultValue={RowData.personCount} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Кількість вільних місць</label>
                                <input type="number" className='form-control' onChange={(e)=> setfreeBedCount(e.target.value)} placeholder="Введіть кількість вільних місць" defaultValue={RowData.freeBedCount} />
                            </div>
                            
                            <Button type='submit' className='btn btn-warning mt-4'onClick={()=>{handleEdit()}}> Редагувати</Button> */}

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

export default AppDormitory;