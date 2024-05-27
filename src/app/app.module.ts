import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FormComponent } from './components/form/form.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    EmployeeComponent,
    WelcomeComponent,
    FormComponent,
    ToastComponent,
    LoaderComponent,
    EmptyStateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
