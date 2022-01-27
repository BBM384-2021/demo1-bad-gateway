package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.payload.CategoryPayload;
import com.bbm384.badgateway.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/all")
    public List<CategoryPayload> allCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping("/add")
    public CategoryPayload addCategory(@RequestBody CategoryPayload categoryPayload){
        return categoryService.addCategory(categoryPayload);
    }
}
