export default interface User {
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
    email: string;
    address: {
        city: string;
        geo: {
            lat: string;
            lng: string;
        },
        street: string;
        suite: string;
        zipcode: string
    };
    company: {
        bs: string;
        catchPhrase: string;
        name: string;
    }

}