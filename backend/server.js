
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;


app.get('/api/health', (req,res)=>res.json({status:'ok'}));


const CONTACTS_FILE = './data/contacts.json';
if(!fs.existsSync('./data')) fs.mkdirSync('./data');
if(!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');

app.get('/api/contacts', (req,res)=>{
  const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE));
  res.json(contacts);
});
app.post('/api/contacts/import', (req,res)=>{
 
  const incoming = req.body.contacts || [];
  let contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE));

  const existingEmails = new Set(contacts.map(c=>c.email));
  const added = [];
  incoming.forEach(c=>{
    if(!existingEmails.has(c.email)){
      contacts.push(c);
      existingEmails.add(c.email);
      added.push(c);
    }
  });
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts,null,2));
  res.json({imported: added.length, added});
});


const CAMPAIGNS_FILE = './data/campaigns.json';
if(!fs.existsSync(CAMPAIGNS_FILE)) fs.writeFileSync(CAMPAIGNS_FILE,'[]');
app.post('/api/campaigns', (req,res)=>{
  const campaigns = JSON.parse(fs.readFileSync(CAMPAIGNS_FILE));
  const c = req.body;
  c.id = campaigns.length+1;
  c.created_at = new Date().toISOString();
  campaigns.push(c);
  fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns,null,2));
  res.json(c);
});


app.post('/api/campaigns/:id/send', (req,res)=>{
  const id = Number(req.params.id);
  const campaigns = JSON.parse(fs.readFileSync(CAMPAIGNS_FILE));
  const campaign = campaigns.find(c=>c.id===id);
  if(!campaign) return res.status(404).json({error:'Campaign not found'});
});

app.listen(PORT, ()=>console.log('Backend listening on',PORT));
