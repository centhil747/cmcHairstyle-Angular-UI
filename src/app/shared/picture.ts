import { Comment } from './comment';

export class Picture {
    _id: string;
    type: string;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;
    comments: Comment[];
}
