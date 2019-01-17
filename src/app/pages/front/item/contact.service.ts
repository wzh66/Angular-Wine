import {Injectable} from '@angular/core';

export interface Contact {
  id: number;
  name: {
    firstName: string,
    lastName: string
  };
  photo?: string;
}

@Injectable({providedIn: 'root'})
export class ContactService {
  private _contacts: Contact[] = [
    {
      id: 0,
      name: {
        firstName: 'Lawrence',
        lastName: 'Marcelino'
      },
      photo: '~/assets/lawrence.jpg'
    },
    {
      id: 1,
      name: {
        firstName: 'Franco',
        lastName: 'Andrade'
      },
      photo: '~/assets/franco.jpg'
    },
    {
      id: 2,
      name: {
        firstName: 'Marta',
        lastName: 'Aleksandra'
      },
      photo: '~/assets/marta.jpg'
    },
    {
      id: 3,
      name: {
        firstName: 'Michal',
        lastName: 'Sisak'
      },
      photo: '~/assets/michal.jpg'
    },
    {
      id: 4,
      name: {
        firstName: 'John',
        lastName: 'Mackanzie'
      },
      photo: '~/assets/photo1.jpg'
    },
    {
      id: 5,
      name: {
        firstName: 'Richard',
        lastName: 'Moore'
      },
      photo: '~/assets/photo4.jpg'
    },
    {
      id: 6,
      name: {
        firstName: 'Bruno',
        lastName: 'Soares'
      },
      photo: '~/assets/photo3.jpg'
    }
  ];

  get contacts(): Contact[] {
    return this._contacts;
  }

  findContact(id): Contact {
    return this._contacts.find(contact => contact.id === parseInt(id, 10));
  }
}
