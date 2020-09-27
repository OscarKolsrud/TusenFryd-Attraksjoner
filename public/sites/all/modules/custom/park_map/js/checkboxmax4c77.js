var checkboxmax = function(element, options){
    this.options = jQuery.extend({}, this.defaults, options);

    this.init = jQuery.proxy(this.init, this);
    this.check_checkboxes = jQuery.proxy(this.check_checkboxes, this);

    this.element = jQuery(element);

    this.init();   
};

jQuery.extend(checkboxmax.prototype, {
    defaults:{
        max: 3,
        group: "body",
        exclude: ".exclude_checkboxmax"
    },
    init:function(){
        jQuery(this.element).find("input[type=checkbox]").mousedown(this.check_checkboxes);
        jQuery(this.element).find("input[type=checkbox]").change(this.check_checkboxes);
    },
    check_checkboxes:function(e){
        group = jQuery(e.currentTarget).parents( this.options.group );

        if(group.hasClass( this.options.exclude )){
            return 0;
        }

        checked_on_group = group.find("input:checked").length;

        if (checked_on_group >= this.options.max){
            group.find("input:not(:checked)").attr("disabled", true);
        }else{
            group.find("input:not(:checked)").attr("disabled", false);            
        }

        // console.log( checked_on_group )
    }
});

jQuery.fn.checkboxmax = function(options){
  return jQuery(this).each(function(){
    if(!jQuery(this).data("checkboxmax"))
      jQuery(this).data("checkboxmax", new checkboxmax(this, options))
  });
};