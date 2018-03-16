package com.elearningportal.apps.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.elearningportal.apps.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.State.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.State.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Course.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.PlayList.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Quiz.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.QuizAns.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Article.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Education.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.EducationCollege.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.EducationCollege.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.EducationCollege.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Gallery.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.GalleryGroup.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.GalleryGroup.class.getName() + ".galleries", jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Services.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Offer.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.Jobs.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.TaxRate.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.StripeCustomer.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.StripePayment.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.StripeTransaction.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.CardExpiryReminder.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearningportal.apps.domain.UserSignUpByReferralCode.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
