package models;

public enum Cycle {
    //@EnumValue("pre")
    PREP("pre"),
    //@EnumValue("cii")
    CII("cii"),
    //@EnumValue("ing")
    ING("ing");
    
    private String code;

    Cycle(String s) {
        code = s;
    }

    public String getCode() {
        return code;
    }
}
