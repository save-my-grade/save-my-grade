package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import org.junit.Test;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;

import static org.junit.Assert.*;

public class UserControllerTest {
    private static final String USERS_URL = "http://localhost:9000/api/users";

    @Test
    public void create() {
        try {
            User user = new User("John", "Doe", "john@test.fr", "test123", false);
            ObjectMapper om = new ObjectMapper();
            ObjectNode responseNode = om.readValue(makeRequest(
                    USERS_URL, "POST", om.writeValueAsString(user)), ObjectNode.class);


            assertTrue(Boolean.valueOf(String.valueOf(responseNode.get("isSuccessfull"))));

            User returnedUser = om.readValue(responseNode.get("body").toString(), User.class);
            assertEquals(user.getFirstName(), returnedUser.getFirstName());
            assertEquals(user.getLastName(), returnedUser.getLastName());
            assertEquals(user.getEmail(), returnedUser.getEmail());
            assertEquals(user.getIsAdmin(), returnedUser.getIsAdmin());
            assertEquals(user.getPassword(), returnedUser.getPassword());

        } catch (IOException e) {
            e.printStackTrace();
            fail();
        }
    }

    public static String makeRequest(String input_url, String httpMethod, String parameters) throws IOException {
        URL url = new URL(input_url);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoInput(true);
        connection.setRequestProperty("Content-Type", "application/json");
        DataOutputStream dos;
        connection.setRequestMethod(httpMethod);

        if (Arrays.asList("POST", "PUT").contains(httpMethod)) {
            connection.setDoOutput(true);
            dos = new DataOutputStream(connection.getOutputStream());
            dos.writeBytes(parameters);
            dos.flush();
            dos.close();
        }

        int respCode = connection.getResponseCode();
        if (respCode != 200 && respCode != 201) {
            return inputStreamToString(connection.getErrorStream());
        }
        return inputStreamToString(connection.getInputStream());

    }

    public static String inputStreamToString(InputStream is) throws IOException {
        BufferedReader br;
        StringBuilder sb = new StringBuilder();

        String line;
        br = new BufferedReader(new InputStreamReader(is));
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        return sb.toString();
    }
}