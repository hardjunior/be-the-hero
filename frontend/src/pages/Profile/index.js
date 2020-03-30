import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setincidents] = useState([]);
    
    const history = useHistory();
    
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setincidents(response.data);
        })
    },[ongId]);
    
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });
            setincidents(incidents.filter(incidents=>incidents.id !== id));
        }catch{
            alert("Erro ao deletar caso, tente novamente.");
        }

    }

    function handleLogout(){
        localStorage.clear();
        
        history.push('/');
    }
    return (
    <div className="profile-container">
        <header>
            <img src={logoImg} alt="Be the Hero"/>
            <span>Bem vinda, {ongName}</span>

            <Link className="button" to="/incidents/new">Registar novo caso</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#E02841" />

            </button>
        </header>
        <h1>Casos Registados</h1>
        <ul>
           {incidents.map(incident => (
               <li key={incident.id}>
                   <strong>Caso:</strong>
                   <p>{incident.title}</p>

                   <strong>Descrição</strong>
                   <p>{incident.description}</p>

                   <strong>VALOR:</strong>
                   <p>{Intl.NumberFormat('pt-PT',{style:'currency', currency: 'EUR'}).format(incident.value)}</p>

                   <button type='button'>
                       <FiTrash2 
                        onClick={()=>handleDeleteIncident(incident.id)}
                        size={20} 
                        color="#a8a8b3"
                        />
                   </button>
               </li>
           ))}
        </ul>
    </div>
        );
}