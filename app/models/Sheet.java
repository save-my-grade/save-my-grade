package models;

public class Sheet {
    private Integer id;
    private Integer authorId;
    private Integer courseId;
    private String name;
    private String tags;
    private String filePath;

    public Sheet(Integer id, Integer authorId, String name, String tags, String filePath) {
        this.id = id;
        this.authorId = authorId;
        this.name = name;
        this.tags = tags;
        this.filePath = filePath;
    }
}
