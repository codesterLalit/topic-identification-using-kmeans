import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatGridListModule,
  MatProgressBarModule,
} from "@angular/material";
import { IdentifySectionComponent } from "./identify-section/identify-section.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RequestsService } from "./services/requests.service";
import { DialogCompComponent } from "./home/dialog-comp/dialog-comp.component";
import { DialogDocComponent } from "./home/dialog-doc/dialog-doc.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { CompareComponent } from "./compare/compare.component";
import { DialogErrorComponent } from "./home/dialog-error/dialog-error.component";
import { FooterComponent } from "./footer/footer.component";
import { MatTableModule } from "@angular/material/table";
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    IdentifySectionComponent,
    DialogCompComponent,
    DialogDocComponent,
    AboutUsComponent,
    CompareComponent,
    DialogErrorComponent,
    FooterComponent,
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressBarModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [RequestsService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogCompComponent,
    DialogDocComponent,
    DialogErrorComponent,
  ],
})
export class AppModule {}
