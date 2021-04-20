package com.bbm384.badgateway.service;

import com.bbm384.badgateway.payload.CategoryPayload;
import com.bbm384.badgateway.repository.CategoryRepository;
import com.bbm384.badgateway.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Validated
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;


    public List<CategoryPayload> getAllCategories(){
        return  categoryRepository.findAll().stream().map(
                category -> ModelMapper.mapToCategoryResponse(category)
        ).collect(Collectors.toList());
    }

}
