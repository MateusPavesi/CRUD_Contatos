package com.example.contatos.model;

public record ContactResponseDTO(Long id, String name, String email, String phonenumber) {
    public ContactResponseDTO(Contact contact) {
        this(contact.getId(), contact.getName(), contact.getEmail(), contact.getPhonenumber());
    }
}
