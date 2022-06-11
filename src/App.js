import './App.css';
 import AppDormitory from './Hostel/dormitory';
 import {Route, Routes } from 'react-router-dom';
import AppHeader from './header';
import AppType from './Types/type';
import AppRoomInfo from './RoomInfo/roomInfo';
import AppRoomList from './RoomList/roomList';

function App() {
  return (
    <div>     
        <AppHeader/>             
        
        <div className="container-my">
        <Routes>
          <Route path="/" element={<AppDormitory/>} />
          <Route path="roomTypes" element={<AppType/>} />
          <Route path="roomList/studentSettle" element={<AppRoomInfo/>} />
          <Route path="roomList/roomInfo" element={<AppRoomInfo/>} />
          <Route path="roomList" element={<AppRoomList/>} />
        </Routes>
     </div>
       
    </div>
      
     
  );
}

export default App;
