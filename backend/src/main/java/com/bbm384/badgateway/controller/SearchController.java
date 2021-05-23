package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.payload.SearchResponse;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.SearchService;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/search")
public class SearchController {

    @Autowired
    SearchService searchService;


    @GetMapping("")
    public SearchResponse getSearchResult(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                          @RequestParam(value = "name") Optional<String> name) {
        return searchService.getSearchResult(page, name);
    }


}
