package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Course;
import models.Sheet;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.List;

public class CourseController extends Controller {
    public Result getAllCourses() {
        List<Course> courses = Course.find.all();
        JsonNode jsonObject = Json.toJson(courses);
        return ok(Util.createResponse(jsonObject, true));
    }

    public Result getCourse(Integer id) {

        Course course = Course.find.byId(id);
        JsonNode jsonObject = Json.toJson(course);
        if (course == null) {
            return ok(Util.createResponse(jsonObject, false));
        } else {
            return ok(Util.createResponse(jsonObject, true));
        }
    }

    public Result createCourse(Http.Request request) {
        Course course;
        try {
            course = Json.fromJson(Util.requestBodyToJson(request), Course.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        course.save();
        JsonNode jsonObject = Json.toJson(course);
        return created(Util.createResponse(jsonObject, true));
    }

    public Result editCourse(Http.Request request, Integer id) {
        Course course = Course.find.byId(id);
        if (course == null) {
            return notFound("Course does not exist");
        }
        Course newCourse;
        try {
            newCourse = Json.fromJson(Util.requestBodyToJson(request), Course.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        newCourse.setId(id);
        newCourse.update("default");
        JsonNode jsonObject = Json.toJson(newCourse);
        return ok(Util.createResponse(jsonObject, true));
    }
}
 