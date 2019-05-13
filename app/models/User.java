package models;

public class User {
    private Integer id;
    private String firstName;
    private String lastName;
    private String mail;
    private Boolean isAdmin;

    public User(Integer id, String firstName, String lastName, String mail, Boolean isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.isAdmin = isAdmin;
    }
}
