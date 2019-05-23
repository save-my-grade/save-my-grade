package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
import play.mvc.Http;

class Util {
    static ObjectNode createResponse(
            Object response, boolean ok) {
        ObjectNode result = Json.newObject();
        result.put("isSuccessfull", ok);
        if (response instanceof String) {
            result.put("body", (String) response);
        } else {
            result.put("body", (JsonNode) response);
        }

        return result;
    }

    static JsonNode requestBodyToJson(Http.Request request) throws Exception {
        JsonNode json = request.body().asJson();
        if (json == null) {
            throw new Exception();
        }
        return json;
    }
}
