export interface Contact {
    id: number;
    type: string;
    number: string;
}

export type ContactForm = Omit<Contact, 'id'>;