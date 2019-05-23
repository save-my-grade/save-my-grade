package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Course;
import models.Sheet;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

public class SheetController extends Controller {
    public Result getSheet(Integer id) {

        Sheet sheet = Sheet.find.byId(id);
        JsonNode jsonObject = Json.toJson(sheet);
        if (sheet == null) {
            return ok(Util.createResponse(jsonObject, false));
        } else {
            return ok(Util.createResponse(jsonObject, true));
        }
    }

    public Result createSheet(Http.Request request) {
        Sheet sheet;
        try {
            sheet = Json.fromJson(Util.requestBodyToJson(request), Sheet.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        sheet.save();
        JsonNode jsonObject = Json.toJson(sheet);
        return created(Util.createResponse(jsonObject, true));
    }

    public Result test() {
        //Sheet sheet = new Sheet(123,456, "Fiche test", "Chapitres, sujets...", "/path/vefdsqfdrs/fichier");
        //sheet.save();
        Course course = new Course("qfkjslnfdjsklqn", "CII");
        course.save();
        return ok();
    }

}
 