import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import Formulario1Page from './pages/Formulario1Page';
import Formulario2Page from './pages/Formulario2Page';
import Formulario3Page from './pages/Formulario3Page';
import Formulario4Page from './pages/Formulario4Page';
import Formulario5Page from './pages/Formulario5Page';


import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TasksContext';


function App(){
  return(
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element = {<LoginPage/>} />
          <Route path='/register' element = {<RegisterPage/>} />

          <Route element={<ProtectedRoute/>}>
            <Route path='/tasks' element = {<TasksPage />} />
            <Route path='/add-tasks' element = {<TaskFormPage/>} />
            <Route path='/tasks/:id' element = {<TaskFormPage/>} />
            <Route path='/profile' element = {<ProfilePage/>} />
            <Route path="formulario_1" element={<Formulario1Page />} />
            <Route path="formulario_2" element={<Formulario2Page />} />
            <Route path="formulario_3" element={<Formulario3Page />} />
            <Route path="formulario_4" element={<Formulario4Page />} />
            <Route path="formulario_5" element={<Formulario5Page />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
export default App