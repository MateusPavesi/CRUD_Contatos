package com.example.contatos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.contatos.model.ContactRepository;
import com.example.contatos.model.ContactResponseDTO;
import com.example.contatos.model.Contact;
import com.example.contatos.model.ContactRequestDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("contact")
public class ContactController {
    
    @Autowired
    private ContactRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveContact(@RequestBody ContactRequestDTO data){
        Contact contactData = new Contact(data);
        repository.save(contactData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ContactResponseDTO> getAll(){
        List<ContactResponseDTO> contacList = repository.findAll().stream().map(ContactResponseDTO::new).toList();
        return contacList;
    }

   @GetMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> getById(@PathVariable Long id) {
        Optional<Contact> contatoOptional = repository.findById(id);

        if (contatoOptional.isPresent()) {
            ContactResponseDTO contactResponseDTO = new ContactResponseDTO(contatoOptional.get());
            return new ResponseEntity<>(contactResponseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<Contact> updateGroup(@RequestBody Contact data) {
        Contact result = repository.save(data);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) {
        repository.deleteById(id);
        return;
    }
}
