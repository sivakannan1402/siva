import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { ListdataComponent } from './listdata/listdata.component';

const routes: Routes = [
  { path: "", component:ListdataComponent},
  { path: "home",redirectTo:''},
  { path: "add", component:AddDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
