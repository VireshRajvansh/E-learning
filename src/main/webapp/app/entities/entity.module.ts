import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ELearningStudentManageModule } from './student-manage/student-manage.module';
import { ELearningTeacherManageModule } from './teacher-manage/teacher-manage.module';
import { ELearningAddressManageModule } from './address-manage/address-manage.module';
import { ELearningStateManageModule } from './state-manage/state-manage.module';
import { ELearningCityManageModule } from './city-manage/city-manage.module';
import { ELearningCourseManageModule } from './course-manage/course-manage.module';
import { ELearningPlayListManageModule } from './play-list-manage/play-list-manage.module';
import { ELearningQuizManageModule } from './quiz-manage/quiz-manage.module';
import { ELearningQuizAnsManageModule } from './quiz-ans-manage/quiz-ans-manage.module';
import { ELearningArticleManageModule } from './article-manage/article-manage.module';
import { ELearningEducationManageModule } from './education-manage/education-manage.module';
import { ELearningEducationCollegeManageModule } from './education-college-manage/education-college-manage.module';
import { ELearningGalleryManageModule } from './gallery-manage/gallery-manage.module';
import { ELearningGalleryGroupManageModule } from './gallery-group-manage/gallery-group-manage.module';
import { ELearningServicesManageModule } from './services-manage/services-manage.module';
import { ELearningOfferManageModule } from './offer-manage/offer-manage.module';
import { ELearningJobsManageModule } from './jobs-manage/jobs-manage.module';
import { ELearningTaxRateManageModule } from './tax-rate-manage/tax-rate-manage.module';
import { ELearningStripeCustomerManageModule } from './stripe-customer-manage/stripe-customer-manage.module';
import { ELearningStripePaymentManageModule } from './stripe-payment-manage/stripe-payment-manage.module';
import { ELearningStripeTransactionManageModule } from './stripe-transaction-manage/stripe-transaction-manage.module';
import { ELearningCardExpiryReminderManageModule } from './card-expiry-reminder-manage/card-expiry-reminder-manage.module';
import { ELearningUserSignUpByReferralCodeManageModule } from './user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ELearningStudentManageModule,
        ELearningTeacherManageModule,
        ELearningAddressManageModule,
        ELearningStateManageModule,
        ELearningCityManageModule,
        ELearningCourseManageModule,
        ELearningPlayListManageModule,
        ELearningQuizManageModule,
        ELearningQuizAnsManageModule,
        ELearningArticleManageModule,
        ELearningEducationManageModule,
        ELearningEducationCollegeManageModule,
        ELearningGalleryManageModule,
        ELearningGalleryGroupManageModule,
        ELearningServicesManageModule,
        ELearningOfferManageModule,
        ELearningJobsManageModule,
        ELearningTaxRateManageModule,
        ELearningStripeCustomerManageModule,
        ELearningStripePaymentManageModule,
        ELearningStripeTransactionManageModule,
        ELearningCardExpiryReminderManageModule,
        ELearningUserSignUpByReferralCodeManageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningEntityModule {}
