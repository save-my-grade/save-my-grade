package controllers;

import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.data.FormFactory;

import javax.imageio.ImageIO;
import javax.inject.*;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class HomeController extends Controller {

	@Inject
	FormFactory formFactory;
}	
	/*
  public Result upload(Http.Request request) throws IOException {
	  
	
	File file = request.body().asRaw().asBytes();
	File outputfile = new File("saved.png");
    if (file != null) {
    	ImageIO.write(file, "png", outputfile);
    	//Files.copy(file.toPath(), Paths.get("C:\\Users\\nroye\\Desktop\\Technoweb\\Destination.png"));
      return ok("File uploaded");
    } else {
      return badRequest().flashing("error", "Missing file");
    }
  }
}*/