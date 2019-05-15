package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class LoginController extends Controller {
    public Result tokenCheck(String token) {
        Boolean tokenValidity = token.equals("1234");

        JsonNode jsonResponse = Json.toJson("{\"success\":" + tokenValidity + ", \"failMessage\":\"Wrong token.\"}");
        return ok(jsonResponse).as("application/json");
    }
}
