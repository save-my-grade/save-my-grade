package models;

public class User {
    private Integer id;
    private String firstName;
    private String lastName;
    private String mail;
    private String loginToken;
    private Boolean isAdmin;

    public User(Integer id, String firstName, String lastName, String mail, Boolean isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.isAdmin = isAdmin;
    }

    public void setToken(String token) {
        this.loginToken = token;
    }

    public boolean checkToken(String token) {
        return this.loginToken.equals(token);
    }
}
