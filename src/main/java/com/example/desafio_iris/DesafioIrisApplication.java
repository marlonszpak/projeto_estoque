package com.example.desafio_iris;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories
@SpringBootApplication
public class DesafioIrisApplication {

	public static void main(String[] args) {
		SpringApplication.run(DesafioIrisApplication.class, args);
	}

}
