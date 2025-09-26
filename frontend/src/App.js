import React, {useEffect, useState} from 'react';
import axios from 'axios';
export default function App(){
  const [contacts, setContacts] = useState([]);
  useEffect(()=>{ axios.get('/api/contacts').then(r=>setContacts(r.data)).catch(()=>{}); },[]);
  return (
    <div style={{fontFamily:'Arial',padding:20}}>
      <h1>Email Marketing - Demo UI</h1>
      <p>Minimal frontend that lists contacts from backend.</p>
      <h3>Contacts</h3>
      <ul>
        {contacts.map((c,i)=>(<li key={i}>{c.email} - {c.first_name||''} {c.last_name||''}</li>))}
      </ul>
    </div>
  );
}
