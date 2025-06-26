package com.SDF.SDF.controller;


import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Adjust as needed
public class DateFormatController {

    @PostMapping("/format-date")
    public Map<String, String> formatDate(@RequestBody Map<String, String> body) {
        String format = body.getOrDefault("format", "yyyyMMdd");
        SimpleDateFormat sdf;
        String formatted;

        try {
            sdf = new SimpleDateFormat(format);
            formatted = sdf.format(new Date());
        } catch (IllegalArgumentException e) {
            formatted = "Invalid Java date format";
        }

        Map<String, String> response = new HashMap<>();
        response.put("formattedDate", formatted);
        return response;
    }
}

