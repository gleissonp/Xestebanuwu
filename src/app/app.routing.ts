import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { FileComponent } from "./file/file.component";
import { RemovedComponent } from "./components/removed/removed.component";
import { AuthGuard } from "./services/authGuard.service";
import { FolderComponent } from "./components/folder/folder.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "folder", component: FolderComponent },
    { path: "file", component: FileComponent },
    { path: 'removed', component: RemovedComponent, canActivate: [AuthGuard] }

]



export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);