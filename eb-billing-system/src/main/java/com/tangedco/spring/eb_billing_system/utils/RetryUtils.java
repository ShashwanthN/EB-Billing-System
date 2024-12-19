package com.tangedco.spring.eb_billing_system.utils;

import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;
import com.razorpay.RazorpayException;

public class RetryUtils {
    private static final int MAX_RETRIES = 5;
    private static final int BASE_WAIT_TIME_MS = 1000;

    public static <T> T retryWithBackoff(Callable<T> callable) throws Exception {
        int retries = 0;
        Random random = new Random();

        while (true) {
            try {
                return callable.call();
            } catch (RazorpayException e) {
                if (e.getMessage().contains("429") && retries < MAX_RETRIES) {
                    int waitTime = BASE_WAIT_TIME_MS * (int) Math.pow(2, retries) + random.nextInt(BASE_WAIT_TIME_MS);
                    TimeUnit.MILLISECONDS.sleep(waitTime);
                    retries++;
                } else {
                    throw e;
                }
            }
        }
    }
}
