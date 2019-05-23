package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Course;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import java.util.List;

public class CourseController extends Controller {
    public Result getAllCourse() {
        List<Course> course = Course.find.all();
        JsonNode jsonObject = Json.toJson(course);
        return ok(Util.createResponse(jsonObject, true));
    }
    public Result getCourse(Integer id) {
        
        Course course = Course.find.byId(id);
        JsonNode jsonObject = Json.toJson(course);
        if (course == null){
            return ok(Util.createResponse(jsonObject, false));
        }else{
            return ok(Util.createResponse(jsonObject, true));
        }
    }
    public Result createCourse(Http.Request request){
        Course course;
        try {
            course = Json.fromJson(getRequest(request), Course.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        course.save();
        JsonNode jsonObject = Json.toJson(course);
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
 