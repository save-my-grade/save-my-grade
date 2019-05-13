package models;

public enum Cycle {
    PREP("pre"), CII("cii"), ING("ing");

    Cycle(String s) {
        code = s;
    }

    private String code;

    public String getCode() {
        return code;
    }
}
