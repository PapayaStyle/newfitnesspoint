import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './home.carousel.html',
  styleUrls: ['./home.carousel.css']
})
export class HomeCarouselComponent {

  public images = [
    {
      title: 'Fitness',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod non eros efficitur dapibus. Nulla vestibulum felis vel tincidunt efficitur.',
      url: './images/hero-1.jpg'
    },
    {
      title: 'Aerobica',
      content: 'Vivamus nec dapibus lorem, id congue arcu. Cras lacinia erat ac tortor luctus, in aliquet orci condimentum. Aliquam pretium urna ut purus sagittis, et euismod lorem semper',
      url: './images/hero-2.jpg'
    },
    {
      title: 'Cardio',
      content: 'Donec egestas urna tortor, a consequat est facilisis sed. Maecenas sit amet placerat mi, quis rhoncus nulla. Quisque quis tellus elit.',
      url: './images/hero-3.jpg'
    }
  ];

  changeBackground(image): any {
    return { 'background-image': 'url(' + image + ')' };
  }
  
}