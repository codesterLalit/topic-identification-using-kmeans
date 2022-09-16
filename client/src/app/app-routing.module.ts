import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { CompareComponent } from "./compare/compare.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "about",
    component: AboutUsComponent,
  },
  {
    path: "compare",
    component: CompareComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
