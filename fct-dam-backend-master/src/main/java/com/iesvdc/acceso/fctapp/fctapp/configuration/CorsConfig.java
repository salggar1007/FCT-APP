package com.iesvdc.acceso.fctapp.fctapp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Configura el mapeo para todas las URL
                .allowedOrigins("*") // Permite todas las solicitudes de origen
                .allowedMethods("*") // Permite los métodos HTTP especificados
                .allowedHeaders("*"); // Permite todos los encabezados
    }
}
