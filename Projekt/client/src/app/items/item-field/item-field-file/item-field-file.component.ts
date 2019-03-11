import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ItemFormControl } from '../../item-form-control';
import { ItemFormGroup } from '../../item-form-group';
import { MatSnackBar, MatSidenav } from '@angular/material';

@Component({
    selector: 'app-item-field-file',
    templateUrl: './item-field-file.component.html',
    styleUrls: ['./item-field-file.component.scss']
})
export class ItemFieldFileComponent implements OnInit {
    readonly DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    @Input()
    control: ItemFormControl;
    @Input()
    form: ItemFormGroup;
    @ViewChild('sidenav')
    sidenav: MatSidenav;

    isNew = false;

    fullScreen = false;

    versions: { readable: string; time: string; name: string }[] = [];

    previewUrl: { url?: SafeResourceUrl; filename?: string; dataUri?: string } = {};

    @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef<HTMLInputElement>;
    constructor(private http: HttpClient, private sanitizer: DomSanitizer, private snackbar: MatSnackBar) {}

    ngOnInit() {
        const files = this.control.value;
        if (this.form.itemId === -1) {
            this.isNew = true;
        }
        if (!files || !files.length) {
            return;
        }

        const firstFile = files[files.length - 1];
        this.loadPreview(firstFile.timestamp, firstFile.name);

        this.versions = this.versions = this.control.value
            .map(version => {
                return {
                    readable: new Date().toLocaleDateString('de-De', this.DATE_OPTIONS),
                    time: version.timestamp,
                    name: version.name
                };
            })
            .reverse();
    }

    upload() {
        if (!this.fileInput.nativeElement.files[0]) {
            this.snackbar.open('No file selected', null);
            return;
        }
        const formData = new FormData();
        const file = this.fileInput.nativeElement.files[0];
        formData.append('file', file);
        this.http
            .post(`${environment.baseUrl}/files/${this.control.id}/${this.form.itemId}`, formData)
            .subscribe((res: any) => {
                const newVersion = {
                    readable: new Date().toLocaleDateString('de-De', this.DATE_OPTIONS),
                    name: file.name,
                    time: res.timestamp
                };
                this.versions.push(newVersion);
                this.loadPreview(newVersion.time, newVersion.name);
            });
    }

    loadPreview(time, filename) {
        this.previewUrl.url = null;
        this.http
            .get(`${environment.baseUrl}/files/${this.control.id}/${this.form.itemId}/${time}`, { responseType: 'blob' })
            .pipe(
                flatMap(res => {
                    return this.blobToDataURL(res);
                })
            )
            .subscribe((res: string) => {
                this.previewUrl.dataUri = res;
                this.previewUrl.url = this.sanitizer.bypassSecurityTrustResourceUrl(res);
                this.previewUrl.filename = filename;
                this.sidenav.close();
            });
    }

    blobToDataURL(blob): Observable<string> {
        return new Observable(observer => {
            const fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                observer.next(e.target.result);
                observer.complete();
            };
            fileReader.readAsDataURL(blob);
        });
    }

    download() {
        this.saveFile(this.previewUrl.dataUri, this.previewUrl.filename);
    }

    saveFile(url, filename) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        // window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}
