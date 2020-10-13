import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {

  estadosCiviles: any[] = ['Soltero', 'Casado', 'Divorciado']
  idEmpleado: any;
  accion = 'Crear';

  myForm: FormGroup;
  constructor(private fb: FormBuilder,
    private service: EmpleadoService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    });

    //Trae el index del empleado de la tabla
    const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam];

  }


  //Define la acción a mostrar en la vista
  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  //Setea los valoers que estén en los campos, por lo que sirve para cuando se crea un usuario
  //o cuando se edita un usuario

  guardarEmpleado() {

    const empl: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      correo: this.myForm.get('correo').value,
      fechaIngreso: this.myForm.get('fechaIngreso').value,
      telefono: this.myForm.get('telefono').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value,
    };

    //If para decidir si la ruta es para editar recibiendo un index, o si no, llegue el campo vacio para crear

    if (this.idEmpleado !== undefined) {
      this.editarEmpleado(empl)
    } else {
      this.agregarEmpleado(empl)
    }
    this.route.navigate(['/']);
  }


  //Hace un push a la lista para crear un empleado
  agregarEmpleado(empl: Empleado) {
    this.service.agregarEmpleado(empl);
    this.snackBar.open('¡El empleado fue agregado con éxito!',
      '', {
      duration: 3000
    });
  }

  editarEmpleado(empl: Empleado) {
    this.service.editEmpleado(empl, this.idEmpleado);
    this.snackBar.open('¡El empleado fue editado con éxito!',
      '', {
      duration: 3000
    });
  }

  esEditar() {
    const empleado: Empleado = this.service.getEmpleado(this.idEmpleado);
    console.log(empleado)

    //Con este pachvalue, se le setea al formulario los valores que se traen con el i desde la tabla
    //Para así, ser visibles. Es como lo que hice con property binding en reclamos.
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      estadoCivil: empleado.estadoCivil,
      sexo: empleado.sexo,
    })
  }

}
