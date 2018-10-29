import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePHP } from '../../service/service';
import { ChooseDialogComponent } from './component.choose.dialog';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../app/app.data.adapter';

@Component({
    selector: 'manage-staff-dialog',
    templateUrl: '../../template/manager/manage.staff.dialog.html',
    styleUrls: [
        '../../css/manager/control-panel.css',
        '../../css/manager/manage.main.css',
        '../../css/manager/manage.staff.css'
    ]
})
export class ManageStaffDialogComponent {
  
    private fileImg = null;

    public staffForm: FormGroup;
    public showPreview: boolean;
    public previewLabel: string;
    public previewIcon: string;
    public previewImage;
   
    public convDate = null;

    constructor(private service: ServicePHP,
        @Inject(MAT_DIALOG_DATA) public staff: any,
        public dialogRef: MatDialogRef<ManageStaffDialogComponent>,
        public dialog: MatDialog,
        public fb: FormBuilder) { 
        
        this.previewImage = this.staff.image;
        
        this.initForm();
        this.fileImg = null;
        
        if(this.staff.type == 'I')
            this.showHidePreview(false);
        else
            this.showHidePreview(true);
    }

    initForm() {
        this.staffForm = this.fb.group({
            id: this.staff.id,
            name: [this.staff.name, [Validators.required, Validators.maxLength(50)]],
            activity: [this.staff.activity, [Validators.required, Validators.maxLength(50)]],
            desc: [this.staff.desc, Validators.required],
            image: this.staff.image,
            show: this.staff.show,
            type: [this.staff.type, Validators.required]
        });
    }

    changeBackground(image): any {
        return { 'background-image': 'url('+image+')'};
    }

    checkEmpty(value: string): boolean {
        if(value)
            return true;
        else
            return false;
    }

    /**
     * triggered by dialog when click outside dialog box
     */
    onNoClick(): void {
        this.dialogRef.close();
    }
    
    /**
     * triggered after select an image to upload
     * @param event 
     */
    onUploadFinished(event) {
        console.log(event.file);
        this.clearImages();

        //store the uploaded image into variable
        this.fileImg = event.file;
    }
    
    /**
     * listener to detect when clear or close image is clicked
     * @param event 
     */
    @HostListener('click', ['$event'])
    handleClearClick(event) {
        let target = event.target || event.srcElement || event.currentTarget;
        if (target.attributes.class != undefined) {
            let classAttr = target.attributes.class.value;
    
            if(classAttr == 'img-ul-x-mark' 
                || classAttr == 'img-ul-close' 
                    || classAttr == 'img-ul-clear img-ul-button') {
                console.log('remove image');
    
                this.staff.image = '';
                this.previewImage = '';
                this.fileImg = null;
            }
        }
    }
    
    /**
     * clear and reset image upload fields
     */
    clearImages() {
        let clearUploadedElement = document.getElementsByClassName('img-ul-clear');
        if(clearUploadedElement.length > 0) {
            let element = clearUploadedElement[0] as HTMLElement;
            element.click();
        }

        let clearHistoryElement = document.getElementsByClassName('img-ul-x-mark');
        for (let i=0; i< clearHistoryElement.length; i++) {
            let element = clearHistoryElement[i] as HTMLElement;
            element.click();
        }

        //clear image variable
        this.staff.image = '';
        this.previewImage = '';
        this.fileImg = null;
    }

    /**
     * clear all form fields
     */
    clearForm() {
        this.staffForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(30)]],
            activity: ['', [Validators.required, Validators.maxLength(30)]],
            desc: ['', Validators.required],
            type: [this.staff.type, Validators.required],
            show: [false],
        });

        this.clearImages();

        this.staff.name = '';
        this.staff.activity = '';
        this.staff.desc = '';
        this.staff.image = '';
        this.staff.show = false;
    }

    /**
     * show and hide the preview
     * @param value boolean optional
     */
    showHidePreview(value: boolean=null) {
        if(value != null)
            this.showPreview = value;
        else
            this.showPreview = !this.showPreview;
        
        if(this.showPreview) {

            this.previewLabel = 'Modifica';
            this.previewIcon = 'edit';
            this.staff.name = this.staffForm.controls['name'].value;
            this.staff.activity = this.staffForm.controls['activity'].value;
            this.staff.desc = this.staffForm.controls['desc'].value;

            //read the new image as URL show to preview
            if(this.fileImg != null) {
                let reader = new FileReader();
                reader.readAsDataURL(this.fileImg);
                reader.onload = (e:any) => {
                    this.previewImage = e.target.result;
                    this.staff.image = this.previewImage;
                };
            }
            
        } else {
            this.previewLabel = 'Anteprima';
            this.previewIcon = 'visibility';
        }
        
    }

    /**
     * send value to service request to save, update or delete Staff
     * @param value form value
     */
    save(value) {
        console.log(value);
        let dialogRes: any;

        this.service.saveStaff(value, this.fileImg)
            .then( res => {
                console.log(res);
                if(value.type == 'I')
                    dialogRes = { status: 'OK', message: 'Staff inserito con successo' };
                else if(value.type == 'U')
                    dialogRes = { status: 'OK', message: 'Staff aggiornato con successo' };
                else if(value.type == 'D')
                    dialogRes = { status: 'OK', message: 'Staff cancellato con successo' };

                this.dialogRef.close(dialogRes);
            })
            .catch( err => {
                console.log(err);
                this.dialogRef.close(err);
            });
    }

    /**
     * open confirm dialog for confirm Staff cancelation
     */
    openChooseDialog(): void {
        let dialogRef = this.dialog.open(ChooseDialogComponent, {
            width: '350px',
            disableClose: true,
            data: { 
                title: 'Elimina ' + this.staff.name, 
                desc: `Sicuro di voler eliminare lo staff ` + this.staff.name + `?`,
                btn_true: 'Conferma',
                btn_false: 'Annulla'
            }
        });

        dialogRef.afterClosed()
            .subscribe( res => {
                console.log('Confirm dialog closed');
                console.log(res);

                //if result is true, proceed with deletion
                if(res) {
                    this.staffForm.controls['type'].setValue('D');
                    this.save(this.staffForm.value);
                }
            });
    }

}