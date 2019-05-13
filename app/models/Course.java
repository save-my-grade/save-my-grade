package models;

public class Course {
    private Integer id;
    private String name;
    private Cycle cycle;

    public Course(Integer id, String name, Cycle cycle) {
        this.id = id;
        this.name = name;
        this.cycle = cycle;
    }
}

