package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Sheet;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

public class SheetController extends Controller {
    public Result getSheet(Integer id) {
        
        Sheet sheet = Sheet.find.byId(id);
        JsonNode jsonObject = Json.toJson(sheet);
        if (sheet == null){
            return ok(Util.createResponse(jsonObject, false));
        }else{
            return ok(Util.createResponse(jsonObject, true));
        }
    }
    public Result createSheet(Http.Request request){
        Sheet sheet;
        try {
            sheet = Json.fromJson(getRequest(request), Sheet.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        sheet.save();
        JsonNode jsonObject = Json.toJson(sheet);
        return created(Util.createResponse(jsonObject, true));
    }

    private JsonNode getRequest(Http.Request request) throws Exception {
        JsonNode json = request.body().asJson();
        if (json == null) {
            throw new Exception();
        }
        return json;
    }
    
}
 