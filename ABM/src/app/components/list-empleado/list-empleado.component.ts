import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {

  displayedColumns: string[] = ['nombreCompleto', 'correo', 'estadoCivil', 'fechaIngreso',
    'sexo', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource();

  listEmpleado: Empleado[];

  //Referencia a un componente hijo, en este caso, al paginator, el sort...
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private service: EmpleadoService, public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //se le asigna el dataSource de la tabla al paginator, sort


    this.cargarEmpleados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.listEmpleado = this.service.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleado);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  eliminarEmpleado(i: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: '¿Está seguro que desea eliminar el empleado?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.service.eliminarEmpleado(i);
        this.cargarEmpleados();
        this.snackBar.open('¡El empleado fue eliminado con éxito!',
          '', {
          duration: 3000
        });
      }

    });
  }

}
