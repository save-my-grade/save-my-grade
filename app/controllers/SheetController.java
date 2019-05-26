package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Course;
import models.Sheet;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.List;

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
  
    public Result editSheet(Http.Request request,Integer id) {
        Sheet sheet = Sheet.find.byId(id);
        if(sheet == null){
            return notFound("Sheet does not exist");
        }
        Sheet newSheet;
        try {
            newSheet = Json.fromJson(Util.requestBodyToJson(request), Sheet.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        newSheet.setId(id);
        newSheet.update("default");
        JsonNode jsonObject = Json.toJson(newSheet);
        return ok(Util.createResponse(jsonObject, true));
    }
  
    public Result delete(Integer id) {
        Sheet sheet = Sheet.find.byId(id);
        if(sheet == null){
            return notFound("Sheet does not exist");
        }
        sheet.delete();
        return ok("sheet has been deleted");
    }
  
    public Result getCourseSheets(Integer courseId) {
        List<Sheet> sheets = Sheet.find.query().where().eq("course_id", courseId).findList();
        JsonNode jsonObject = Json.toJson(sheets);
        return ok(Util.createResponse(jsonObject, true));
    }
}
 