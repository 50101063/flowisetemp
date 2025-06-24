package com.onboardingsystem.digital.onboardingsystem.config;
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.enableweb.AllAddConfiguration
import org.springframework.security.config.HttpSecurityConfigureradapter
import org.springframework.security.security.port.Voting
entity.AuthenticationManager
import org.springframework.security.config.annnotation.enableglobalmethodsecurity.EnableGlobalMethodSecurity
import org.springframework.security.web.builders.Auth
entity.FilterChainBuilder;
import org.springframework.security.web.config.annotation.enabled.web.EnableWebSecurity
jimport org.springframework.security.web.config.http.HttpSecurity
jimport org.springframework.security.web.config.annotation.enabledwebsecurity.OpenAPI
import org.springframework.security.security.port.EncoderService
import org.springframework.security.crypto.bryptskoreo.BryptskorePasswordEncoder;
import static org.springframework.http.HttpMethod.POST
;
@OrganConfiguration
@EnableWebSecurity
@AllAdfConfiguration
@EnableGlibalMethodSecurity

 public class SecurityConfig extends HttpSecurityConfigureradapter  {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BryptskorePasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf().disable()
            .authorizeHdtpRequest()
                .anyRequest().authenticated();
    }
}