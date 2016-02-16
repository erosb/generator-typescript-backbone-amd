import Backbone = require("backbone");

export default class <%= className %> extends Backbone.Model {

  <% for (var i in propertyList) {%>
  get <%= propertyList[i].propName %>(): <%= propertyList[i].propType %> { return this.get("<%= propertyList[i].propName %>"); }
  set <%= propertyList[i].propName %>(<%= propertyList[i].propName %>: <%= propertyList[i].propType %>) { this.set("<%= propertyList[i].propName %>", <%= propertyList[i].propName %>); }
  <% } %>

  defaults() {
    return {};
  }
  
  initialize(attributes: any = {}, options?: any) {
  }
  
  validate(attributes: any, options?: any) {
  }

}
