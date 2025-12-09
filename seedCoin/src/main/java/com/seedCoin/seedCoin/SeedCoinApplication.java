package com.seedCoin.seedCoin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SeedCoinApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeedCoinApplication.class, args);
	}

}
