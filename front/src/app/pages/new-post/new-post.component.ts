import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { NavigateBackArrowComponent } from '../../components/navigate-back-arrow/navigate-back-arrow.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    NavLayoutComponent,
    NavigateBackArrowComponent,
    MatFormFieldModule,
    FormsModule,
    MatInput,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  topicOptions: { value: string; viewValue: string }[] = [
    { value: 'sport', viewValue: 'Sport' },
    { value: 'culture', viewValue: 'Culture' },
    { value: 'economie', viewValue: 'Economie' },
    { value: 'technologie', viewValue: 'Technologie' },
    { value: 'politique', viewValue: 'Politique' },
  ];
}
