package com.seedCoin.seedCoin.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Around("execution(* com.seedCoin.seedCoin.controller..*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        Object[] args = joinPoint.getArgs();
        String user = getCurrentUser();

        log.info("USER: [{}] | ENTER: {}.{}() with argument[s] = {}", user, className, methodName,
                Arrays.toString(args));

        try {
            Object result = joinPoint.proceed();
            long elapsedTime = System.currentTimeMillis() - start;
            log.info("USER: [{}] | EXIT: {}.{}() | Execution time: {} ms", user, className, methodName, elapsedTime);
            return result;
        } catch (IllegalArgumentException e) {
            log.error("USER: [{}] | ILLEGAL ARGUMENT: {}.{}() in {}", user, className, methodName,
                    Arrays.toString(args));
            throw e;
        }
    }

    private String getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        return "Anonymous";
    }
}
