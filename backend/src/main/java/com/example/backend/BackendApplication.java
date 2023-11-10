package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		Path currentPath = Paths.get(System.getProperty("user.dir"));
		Path desiredPath = currentPath.getParent();

		String diretorio = desiredPath.toString() + "/frontend/src/assets/image";
		System.out.println(diretorio);
	}

}
