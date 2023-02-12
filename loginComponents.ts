import {Client, LoginState} from "./Model";
import '//code.jquery.com/jquery-3.6.3.slim.js';

export default class ClientListComponent {
    private $el : any;

    constructor(el : HTMLElement)
    {
        this.$el = $(el);
    }

    render(clients){
        this.$el.html('');
            
        if (!client.length) {
            this.$el.html(
                "<div class='list-group-item text-center text-giant'>" +
                "    <strong>You've completed everything you needed to do!</strong>" +
                "</div>"
            );
            
            return;
        }
        
        for(var index in clients) {
            var client = clients[index];
            this.renderClient(clients).appendTo(this.$el);
        }
      
    }
    
      
    private renderClient(client) {
        return $(
            "<div class='todo-item list-group-item "+ (client.state == 2 ? 'completed' : '') +"'>" +
            "   <div class='row'>" +
            "       <div class='col-md-2 text-center'>" +
            "           <i class='incomplete glyphicon glyphicon-unchecked text-muted text-giant'></i>" +
            "           <i class='completed-indicator completed glyphicon glyphicon-ok text-giant'></i>" +
            "       </div>" +
            "       <div class='col-md-10'>" +
            "            <span class='incomplete text-giant'>" + client.name + "</span>" +
            "            <span class='completed text-strikethrough text-muted text-giant'>" + client.name + "</span>" +
            "        </div>" +
            "    </div>" +
            "    <div class='clearfix'></div>" +
            "</div>"
        ).on('click', function() {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent('client-toggle', true, true, { clienId: client.id });
            this.dispatchEvent(event);
        });
    }
}
