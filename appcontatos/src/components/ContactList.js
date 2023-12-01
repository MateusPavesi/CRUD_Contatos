import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ContactList.css';

const ContactList = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch('/contact')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedContact = [...contacts].filter(i => i.id !== id);
      setContacts(updatedContact);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const contactList = contacts.map(contact => {
    return <tr key={contact.id}>
      <td className='tableRow'>{contact.name}</td>
      <td className='tableRow'>{contact.email}</td>
      <td className='tableRow'>{contact.phonenumber}</td>
      <td>
        <ButtonGroup>
          <Button className='editBtn' onClick={() => navigate(`/contact/${contact.id}`)}>Editar</Button>
          <Button className='delBtn' onClick={() => remove(contact.id)}>Deletar</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div className='containerMain'>
        <div className="containerBtn">
            <h1>Lista de contatos</h1>
            <Button className='addBtn' tag={Link} to="/contact/new">Adicionar contato</Button>
        </div>
        <Table className="table">
            <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
            </tr>
            </thead>
            <tbody>
            {contactList}
            </tbody>
        </Table>
    </div>
  );
}

export default ContactList;