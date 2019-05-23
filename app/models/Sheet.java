package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Sheet extends Model {

    @Id
    Integer id;
    Integer author_id;
    Integer course_id;
    String name;
    String tags;
    @Column(unique = true)
    String file_path;

    public Sheet() {
        super();
    }

    public Sheet(Integer author_id, Integer course_id, String name, String tags, String file_path) {
        this.author_id = author_id;
        this.course_id = course_id;
        this.name = name;
        this.tags = tags;
        this.file_path = file_path;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAuthorId() {
        return this.author_id;
    }

    public void setAuthorId(Integer author_id) {
        this.author_id = author_id;
    }

    public Integer getCourseId() {
        return this.course_id;
    }

    public void setCourseId(Integer course_id) {
        this.course_id = course_id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTags() {
        return this.tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getFilePath() {
        return this.file_path;
    }

    public void setFilePath(String file_path) {
        this.file_path = file_path;
    }

    public static final Finder<Integer, Sheet> find = new Finder<>(Sheet.class);
}
