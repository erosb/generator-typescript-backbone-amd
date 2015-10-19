<% if (templatePath) { %>
/// <amd-dependency path="<%= templatePath %>" />
<% } %>
import Backbone = require("backbone");
import Handlebars = require("handlebars");
import <%= modelClassName %> = require("<%= modelPath %>");
<% if (templatePath) { %>
var template = Handlebars.compile(require("<%= templatePath %>"));
<% } %>

class <%= className %> extends Backbone.View<<%= modelClassName %>> {
<% if (templatePath) {%>
    private template = template;
<% } %>
    events() {
        return {
            
        };
    }

    initialize(options: any = {}) {
        this.listenTo(this.model, "change", this.updateFullName.bind(this));
    }
    
    render() {
        this.$el.html(this.template(this.model));
        return this;
    }
}

export = <%= className %>;
