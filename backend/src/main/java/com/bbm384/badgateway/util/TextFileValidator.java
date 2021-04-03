package com.bbm384.badgateway.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;


public class TextFileValidator {
    private MultipartFile file;

    public TextFileValidator(MultipartFile file){
        this.file = file;
    }

    public List<String> run(){
        try {
            return runFirstFormat();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private List<String> runFirstFormat(){
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));

            for(String line; (line = br.readLine()) != null; ) {
                String[] splitStr = line.trim().split("\\s+");
                for (String word: splitStr) {
                    System.out.print(word + "\t");
                }
                System.out.println();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
