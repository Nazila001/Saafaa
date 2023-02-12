import {Client, LoginState} from "./Model";

interface PostServices {
    add (client : Client) : Client;
    add ( client : string) : Client;
    loginButton () : void;
    getAll() : Client[];
    getById( client : number) : Client;
}

class ClientService implements PostServices {
    private static _lastId = 0;
    private clients : Client[] = []; //list for clients
    
    constructor( clients : string[]) {
        if (clients) {
            clients.forEach(client => this.add(client));
        }
    }
    
    private static generateClientId() : number {
        return ClientService._lastId += 1;
    }
    private static clone <T> (src: T) : T {
        var clone = JSON.stringify(src);
        return JSON.parse(clone);
    } 

    add(client : Client) : Client
    add(client : string) : Client
    add(input) : Client {
        var client : Client = {
            id : ClientService.generateClientId(),
            name : input,
            family : input,
            password : input,
            state : LoginState.Active,
        };

        if(typeof input === 'string')
        {
            client.name = input;
        }
        else if(typeof input.name === 'string')
        {
            client.name = input.name;
        }
        else{
            throw 'نام کاربری صحیح نیست!لطفا مجدد امتحان کنید'
        }
        this.clients.push(client);

        return client; 
    }


    loginButton() : void {
        this.clients = this.clients.filter( x => x.state == LoginState.Active)
    }

    getAll(): Client[] {
        return ClientService.clone(this.clients);
    }

    getById(clientId: number): Client {
        var client =  this._find(clientId); 
        return ClientService.clone(client);  //change to json and return json
    }

    private _find(clientId: number) : Client 
    {
        var filtered = this.clients.filter(x => x.id == clientId);
        if (filtered.length)
        {
            return filtered[0];
        }

        return null; //For checking to avoid saving two ids which are the same    
    }

}
