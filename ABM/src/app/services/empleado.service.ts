import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  listEmpleado: Empleado[] = [
    {
      nombreCompleto: 'Lucas Martinez', correo: 'lmartinez@gmail.com', telefono: 383723384,
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Soltero'
    },
    {
      nombreCompleto: 'Rodrigo Aliaga', correo: 'raliaga@gmail.com', telefono: 383426746,
      sexo: 'Masculino', fechaIngreso: new Date('2019-05-25'), estadoCivil: 'Soltero'
    },
    {
      nombreCompleto: 'María Funes', correo: 'mfunes@gmail.com', telefono: 635452334,
      sexo: 'Femenino', fechaIngreso: new Date('2016-01-14'), estadoCivil: 'Casada'
    },
    {
      nombreCompleto: 'Lucrecia Juarez', correo: 'mariaj@gmail.com', telefono: 636485720,
      sexo: 'Femenino', fechaIngreso: new Date('2020-03-15'), estadoCivil: 'Casada'
    },
    {
      nombreCompleto: 'Federico González', correo: 'fgonzalez@gmail.com', telefono: 958205242,
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Casado'
    },
    {
      nombreCompleto: 'Estefanía Schutz', correo: 'eschitz@gmail.com', telefono: 673628256,
      sexo: 'Femenino', fechaIngreso: new Date('2019-03-23'), estadoCivil: 'Soltera'
    },
    {
      nombreCompleto: 'María Belen Arzu', correo: 'mbarzu@gmail.com', telefono: 482759275,
      sexo: 'Femenino', fechaIngreso: new Date('2018-09-20'), estadoCivil: 'Soltera'
    }
  ];
  constructor() { }

  getEmpleados() {
    return this.listEmpleado.slice();
  }

  eliminarEmpleado(i: number) {
    this.listEmpleado.splice(i, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleado.unshift(empleado)
  }

  getEmpleado(i: number) {
    return this.listEmpleado[i];
  }

  editEmpleado(empleado: Empleado, i: number) {
    this.listEmpleado[i].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleado[i].correo = empleado.correo;
    this.listEmpleado[i].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleado[i].telefono = empleado.telefono;
    this.listEmpleado[i].estadoCivil = empleado.estadoCivil;
    this.listEmpleado[i].sexo = empleado.sexo;

  }
}

/* Se usan para hacer peticiones http como hacia ujn backend, en este caso
se usará para comunicar datos entre componentes, y también sirve
para hacer lógia de negocio
 */