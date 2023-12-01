import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import '../styles/ContactEdit.css';
import Navbar from './Navbar';

const ContactEdit = () => {
  const initialFormState = {
    name: '',
    email: '',
    phonenumber: ''
  };
  const [contact, setContact] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/contact/${id}`)
        .then(response => response.json())
        .then(data => setContact(data));
    }
  }, [id, setContact]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setContact({ ...contact, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/contact${contact.id ? `/${contact.id}` : ''}`, {
      method: (contact.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    setContact(initialFormState);
    navigate('/');
  }

  const title = <h2>{contact.id ? 'Editar Contato' : 'Adicionar Contato'}</h2>;

  return (<div>
      <Container>
        <Navbar/>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup className='formGroup'>
            <Label for="name" className='formLabel'>Nome</Label>
            <Col>
              <Input type="text" name="name" id="name" value={contact.name || ''}
                     onChange={handleChange} autoComplete="name"/>
            </Col>
          </FormGroup>
          <FormGroup className='formGroup'>
            <Label for="email" className='formLabel'>Email</Label>
            <Col>
              <Input type="text" name="email" id="email" value={contact.email || ''}
                    onChange={handleChange} autoComplete="email"/>
            </Col>
          </FormGroup>
          <FormGroup className='formGroup'>
            <Label for="phonenumber" className='formLabel'>Telefone</Label>
            <Col>
              <Input type="text" name="phonenumber" id="phonenumber" value={contact.phonenumber || ''}
                    onChange={handleChange} autoComplete="phonenumber"/>
            </Col>
          </FormGroup>
          <FormGroup className='formGroupBtn'>
            <Button type="submit" className='saveBtn'>Save</Button>{' '}
            <Button onClick={() => navigate(`/`)} className='cancelBtn'>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ContactEdit;