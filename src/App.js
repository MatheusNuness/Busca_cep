

import { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import api from './services/api';
import './style.css';
import bgImage from './video/tec.mp4';

function App() {
  // back
  const[input, setInput] = useState('')
  const [cep,setCep] = useState({});

  async function handSearch(){
    
    if(input === ''){
      alert("Preencha")
      return;
    }

    try{ 
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("Ops erro ao buscar");
      setInput("")
    }
  }


  return (
   
      
      <div className="container">
      
      <video autoPlay loop muted>
        <source src={bgImage} type="video/mp4"/>
      </video>

        <h1 className='title'> Buscador CEP </h1>
        <div className="containerInput">
          <input type="text"
          placeholder="Digite o seu CEP"
          // mano
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
        <button className="buttonSearch"
        // mano
        onClick={handSearch}>
      
          <FiSearch size={25} color= "#000"/>
        </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep} </h2>
      
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
      
      </div>

  );
}

export default App;
