import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { AppSelectComponent } from "./select.component";
import { OptionModel } from "./option.model";

@Component({
    selector: "app-select-user",
    templateUrl: "./select.component.html",
    standalone: true,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AppSelectUserComponent, multi: true }],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppSelectUserComponent extends AppSelectComponent {
    @Input() autofocus = false;
    @Input() child!: AppSelectComponent;
    @Input() class!: string;
    @Input() disabled = false;
    @Input() formControlName!: string;
    @Input() text!: string;

    constructor(private readonly http: HttpClient) {
        super();
        this.load();
    }

    getOptions(_: any): Observable<OptionModel[]> {
        return this.http
            .get("https://jsonplaceholder.cypress.io/users")
            .pipe(mergeMap((x: any) => x), map((x: any) => new OptionModel(x.id, x.name)), toArray());
    }
}
