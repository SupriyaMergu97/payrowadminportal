import { Component, OnInit } from '@angular/core';
import{jsPDF} from 'jspdf';
import  html2canvas from 'html2canvas'
@Component({
  selector: 'app-nbq-form',
  templateUrl: './nbq-form.component.html',
  styleUrls: ['./nbq-form.component.scss']
})
export class NbqFormComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	async openPDF() {
		let DATA1: any = document.getElementById('htmlOne');

		let DATA2: any = document.getElementById('htmlTwo');
		let DATA3: any = document.getElementById('htmlThree');
		let DATA4: any = document.getElementById('htmlFour');
		html2canvas(DATA1).then(async (canvas) => {
			var setWidth = 1150; var setHeight = 1400.118;
			// var setWidth = 1170; var setHeight = 1514.118;//ORIGINAL
			const FILEURI = canvas.toDataURL('image/png');
			let PDF = new jsPDF('p', 'pt', 'a4');
			let position = 0;
			html2canvas(DATA2).then((cn2)=>{
				const FILEURI2 = cn2.toDataURL('image/png');
				html2canvas(DATA3).then((cn3)=>{
					const FILEURI3 = cn3.toDataURL('image/png');
					html2canvas(DATA4).then((cn4)=>{
						const FILEURI4 = cn4.toDataURL('image/png');
						PDF.addImage(FILEURI, 'PNG', 40, 40, (setWidth*.62) - 190, (setHeight*.62) - 90);
						PDF.addPage();
						PDF.addImage(FILEURI2, 'PNG', 40, 40, (setWidth*.62) - 190, (setHeight*.62) - 90);
						PDF.addPage();
						PDF.addImage(FILEURI3, 'PNG', 40, 40, (setWidth*.62) - 190, (setHeight*.62) - 90);
						PDF.addPage();
						PDF.addImage(FILEURI4, 'PNG', 40, 40, (setWidth*.62) - 190, (setHeight*.62) - 90);
						PDF.save('wpf.pdf');

					})
				})
			})


		});

	}

}
