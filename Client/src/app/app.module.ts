import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UppercasePipe } from './pipes/uppercase.pipe';

import { BoardService } from './services/board/board.service';
import { TaskService } from './services/task/task.service';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';

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

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

// PROV until front decides
import { CreateLabelComponent } from './components/create-label/create-label.component';
import { LabelDetailComponent } from './components/label-detail/label-detail.component';
import { CreateStateComponent } from './components/create-state/create-state.component';
import { CommentComponent } from './components/comment/comment.component';
import { ListDetailKanbanComponent } from './components/list-detail-kanban/list-detail-kanban.component';
import { ListDetailTableComponent } from './components/list-detail-table/list-detail-table.component';
// import { HomeComponent } from './components/home/home.component';
import { StateListComponent } from './components/state-list/state-list.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { StateDetailComponent } from './components/state-detail/state-detail.component';
import { BoardSettingsComponent } from './components/board-settings/board-settings.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { ListSettingsComponent } from './components/list-settings/list-settings.component';
import { LayoutSelectorComponent } from './components/layout-selector/layout-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { TaskMoveCopyComponent } from './components/task-move-copy/task-move-copy.component';

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
    CommentComponent,
    ListDetailKanbanComponent,
    ListDetailTableComponent,
    // HomeComponent,
    StateListComponent,
    LabelListComponent,
    StateDetailComponent,
    BoardSettingsComponent,
    TaskDetailComponent,
    ListSettingsComponent,
    LayoutSelectorComponent,
    SpinnerComponent,
    ColorSelectorComponent,
    TaskMoveCopyComponent,
  ],
  imports: [
    // CommonModule,
    DragDropModule,
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
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // Ensuring that a single instance is created and shared across all components that inject it.
    BoardService, // So it is available throughout the application
    TaskService,
    UserAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}