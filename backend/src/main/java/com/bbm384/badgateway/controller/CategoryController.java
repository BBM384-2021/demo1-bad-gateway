package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.payload.CategoryPayload;
import com.bbm384.badgateway.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("${app.api_path}/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/all")
    public List<CategoryPayload> allCategories(){
        return categoryService.getAllCategories();
    }
}
