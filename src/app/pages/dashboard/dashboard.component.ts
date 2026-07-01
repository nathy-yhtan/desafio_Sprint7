import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CarTableComponent } from "../../components/car-table/car-table.component";
import { DashboardService } from '../../services/dashboard.service';
import { Veiculo, VinInfos } from '../../models/car';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, CarTableComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService)

  veiculos: Veiculo[] = [] //uma lista de veiculos é iniciado vazio

  veiculoSelecionado: Veiculo = { //é iniciado como veiculo que não existe
    id: -1,
    connected: 0,
    volumetotal: 0,
    softwareUpdates: 0,
    vehicle: "",
    img: "",
    vin: "",
  }

  isMenuAberto = false;

  constructor(private router: Router) { }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate([""])
  }

  vinInfos: VinInfos = { id: -1, lat: 0, long: 0, nivelCombustivel: 0, odometro: 0, status: "" }

  ngOnInit() {
    this.dashboardService.getVeiculos().subscribe({
      error: (err) => console.error(err),
      next: (resposta: any) => {
        this.veiculos = resposta.vehicles;

        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0];
        }

        //^buscas

        this.dashboardService.getVinInfos(this.veiculoSelecionado.vin).subscribe({

          error: () => { },
          next: (vinInfos: any) => {
            this.vinInfos = vinInfos
          }
        })
      }
    })
  }

  onChangeSelect(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value)
    const veiculo = this.veiculos.find((veiculo) => veiculo.id === id)

    if (veiculo) {
      this.veiculoSelecionado = veiculo
    }

    //adicionando
    this.dashboardService.getVinInfos(this.veiculoSelecionado.vin).subscribe({

      error: () => { },
      next: (vinInfos) => {
        this.vinInfos = vinInfos //this.vinInfos
      }
    })
  }

  onChangeVin() {

  }

}