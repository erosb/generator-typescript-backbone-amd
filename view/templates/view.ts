<% if (templatePath) { %>
/// <amd-dependency path="<%= templatePath %>" />
<% } %>
import Backbone = require("backbone");
import Handlebars = require("handlebars");
import <%= modelClassName %> = require("<%= modelPath %>");

class <%= className %> extends Backbone.View<<%= modelClassName %>> {
<% if (templatePath) {%>
    template = Handlebars.compile(require("<%= templatePath %>"));
<% } %>
    events() {
        return {
            
        };
    }

    initialize(options: any = {}) {
        this.listenTo(this.model, "change", this.render);
    }
    
    render() {
        this.$el.html(this.template(this.model));
        return this;
    }
}

export = <%= className %>;
