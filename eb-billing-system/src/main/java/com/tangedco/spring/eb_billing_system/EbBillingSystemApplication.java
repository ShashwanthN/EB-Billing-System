package com.tangedco.spring.eb_billing_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EbBillingSystemApplication {

	public static void main(String[] args) {

		SpringApplication.run(EbBillingSystemApplication.class, args);
	}

}
