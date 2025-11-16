
export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface Sponsor {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  church: string;
}

export interface Ticket {
  name: string;
  price: number;
}
