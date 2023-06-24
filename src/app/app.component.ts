import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMenuCategory, IMenuProduct } from './interfaces/menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { formatPrice } from './functions/price';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'flex flex-nowarp relative bg-[#f3c617]'
  }
})
export class AppComponent {
  public MenuCategories: IMenuCategory[] = [];
  public MenuProducts: IMenuProduct[] = [];

  public ShowDrawer: boolean = false;

  public Restaurant: any = {}

  public SelectedCategory: number = 0;

  public get MenuProductsMap(): IMenuProductMap[] {
    return this.MenuCategories.map((item, index) => ({
      category: item,
      products: this.MenuProducts.filter((item) => item.category == index)
    }))
  }

  public get MenuProductsSelected(): IMenuProduct[] {
    return this.MenuProducts.filter((item) => item.category == this.SelectedCategory);
  }

  public get MenuCategorySelected(): IMenuCategory {
    return this.MenuCategories[this.SelectedCategory]
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/data.json', {}).subscribe((data: any) => {
      this.Restaurant = data['restaurant'];

      const categories = new Set(data['menu'].filter((item: any) => item.category != 'پر فروش ها').map((item: any) => item.category));
      this.MenuCategories = Array.from(categories).map((item: any, index: number) => ({
        id: index,
        name: item,
        image: `assets/images/menu/category/${item.toLowerCase().split(' ').join('-')}.png`,
        link: `#${item.toLowerCase().split(' ').join('-')}`
      }));

      this.MenuProducts = data['menu'].filter((item: any) => item.category != 'پر فروش ها').map((item: any, index: number) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: formatPrice(item.price),
        image: item.thumbnail,
        category: this.MenuCategories.findIndex((category) => category.name == item.category)
      }));
    });
  }
}

interface IMenuProductMap {
  category: IMenuCategory;
  products: IMenuProduct[];
}
