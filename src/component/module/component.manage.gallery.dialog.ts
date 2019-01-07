import { Component, Inject, HostListener } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ChooseDialogComponent } from './component.choose.dialog';

@Component({
  selector: 'manage-gallery-dialog',
  templateUrl: '../../template/module/manage.gallery.dialog.html',
  styleUrls: [
    '../../css/manager/control-panel.css',
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.gallery.css'
  ]
})
export class ManageGalleryDialogComponent {

  private fileImg = null;
  private type;

  public previewImage = null;
  public new:boolean;

  constructor(private service: ServicePHP,
    @Inject(MAT_DIALOG_DATA) public image: any,
    public dialogRef: MatDialogRef<ManageGalleryDialogComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService) {
    
    this.type = image.type;
    if(image.type == 'D') {
      //this.previewImage = 'http://localhost' + this.image.preview;
      this.previewImage = this.image.preview;
      this.fileImg = this.image.preview;
      this.new = false;
    } else {
      this.new = true;
    }
  }
  
  /**
   * triggered by dialog when click outside dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileUpload(file) {
    this.fileImg = file;
  }
  /**
   * open confirm dialog for confirm Staff cancelation
   */
  openChooseDialog(): void {
    let dialogRef = this.dialog.open(ChooseDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Eliminazione immagine ',
        desc: `Sicuro di voler rimuovere l'immagine?`,
        btn_true: 'Conferma',
        btn_false: 'Annulla'
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        console.log('Confirm dialog closed');
        console.log(res);

        //if result is true, proceed with deletion
        if (res) {
          let param = {
            type: this.type,
            id: this.image.id,
            thumbnail: this.image.thumbnail,
            preview: this.image.preview,
            image: this.image.image,
          };
          this.save(param);
        }
      });
  }

  /**
   * send value to service request to save, update or delete Staff
   * @param value form value
   */
  async save(param?:any) {
    console.log(this.type);
    console.log(this.fileImg);

    if(!param) {
      param = { type: this.type };
    }

    let res = await this.service.saveGallery(param, this.fileImg);
    if(res) {
      if (this.type == 'I')
        this.toastr.success('Immagine caricata con successo');
      else if (this.type == 'D')
        this.toastr.success('Immagine cancellata con successo');

      this.dialogRef.close({ status: 'OK'});
    } else {
      this.dialogRef.close({ status: 'KO'});
    }
  }

}