import './App.css'
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import { useAuth } from './contexts/AuthContext'; // Importe o hook useAuth
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import { Route, Routes } from 'react-router-dom';
import UserProfileForm from './views/UserProfilePage';
import ContactList from './views/ContactListPage';
import AddContactPage from './views/AddContactPage';
import Chat from './views/ChatPage';

function App() {
  return (
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
  );
}

function AuthContent() {
  const { user } = useAuth(); 
  return (
    <>
      {user ?
         <Routes>
           <Route index element={<ContactList />} />
            <Route path="/user-prof" element={<UserProfileForm />} />
            <Route path="/add-cont"  element={<AddContactPage />} />
            <Route path="/chat/:id"  element={<Chat />} />
            </Routes>
         
     
       : 
      
      <LoginPage />}
    </>
  );
  
  
}

export default App;