package com.bbm384.badgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class Application {

	static Map<String, String[]> words = new HashMap<>();

	static int largestWordLength = 0;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		loadConfigs();
	}

	public static Map<String, String[]> getWords() {
		return words;
	}

	public static void setWords(Map<String, String[]> words) {
		Application.words = words;
	}

	public static int getLargestWordLength() {
		return largestWordLength;
	}

	public static void setLargestWordLength(int largestWordLength) {
		Application.largestWordLength = largestWordLength;
	}

	public static void loadConfigs() {
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(new URL("https://docs.google.com/spreadsheets/d/1hIEi2YG3ydav1E06Bzf2mQbGZ12kh2fe4ISgLg_UBuM/export?format=csv").openConnection().getInputStream()));
			String line = "";
			int counter = 0;
			while((line = reader.readLine()) != null) {
				counter++;
				String[] content = null;
				try {
					content = line.split(",");
					if(content.length == 0) {
						continue;
					}
					String word = content[0];
					String[] ignore_in_combination_with_words = new String[]{};
					if(content.length > 1) {
						ignore_in_combination_with_words = content[1].split("_");
					}

					if(word.length() > largestWordLength) {
						largestWordLength = word.length();
					}
					words.put(word.replaceAll(" ", ""), ignore_in_combination_with_words);

				} catch(Exception e) {
					e.printStackTrace();
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
