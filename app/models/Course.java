package models;

import io.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Course extends Model{

    @Id
    Integer id;
    @Column(unique = true)
    String name;
    Cycle cycle;

    public Course(Integer id, String name, Cycle cycle) {
        this.id = id;
        this.name = name;
        this.cycle = cycle;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Cycle getCycle() {
        return this.cycle;
    }

    public void setCycle(Cycle cycle) {
        this.cycle = cycle;
    }


}

