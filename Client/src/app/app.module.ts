import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UppercasePipe } from './pipes/uppercase.pipe';

import { BoardService } from './services/board-taskList-service/board-taskList-service.service';
import { TaskService } from './services/task-service/task-service.service';
import { UserAuthServiceService } from './services/user-auth-service/user-auth-service.service';

import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ProfileComponent } from './components/profile/profile.component';

import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { CreateListComponent } from './components/create-list/create-list.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

// PROV until front decides
import { CreateLabelComponent } from './components/create-label/create-label.component';
import { LabelDetailComponent } from './components/label-detail/label-detail.component';
import { CreateStateComponent } from './components/create-state/create-state.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    UppercasePipe,
    CreateBoardComponent,
    BoardListComponent,
    BoardDetailComponent,
    CreateListComponent,
    HeaderComponent,
    LoginFormComponent,
    WelcomeComponent,
    SignupFormComponent,
    ListDetailComponent,
    ProfileComponent,
    CreateTaskComponent,
    CreateLabelComponent,
    LabelDetailComponent,
    CreateStateComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ // Ensuring that a single instance is created and shared across all components that inject it.
    BoardService, // So it is available throughout the application
    TaskService,
    UserAuthServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
